package com.esgi.foodtracker.service;

import com.azure.storage.blob.BlobClient;
import com.azure.storage.blob.BlobContainerClient;
import com.datastax.driver.core.LocalDate;
import com.esgi.foodtracker.model.*;
import com.esgi.foodtracker.repository.*;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.zxing.*;
import com.google.zxing.common.HybridBinarizer;
import com.google.zxing.oned.EAN13Reader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.stream.Collectors;


@Service
public class ProductService {

    final static Logger logger = LoggerFactory.getLogger(ProductService.class);

    @Value("${spring.cloud.azure.storage.account}")
    private String storageAccount;

    @Value("${model.port}")
    private String portModel;

    @Autowired
    private BlobContainerClient blobContainerClient;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductUserRepository productUserRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductUserDailyHabitsRepository productUserDailyHabitsRepository;

    @Autowired
    private ProductUserHabitsRepository productUserHabitsRepository;

    public String decodeBarcode(MultipartFile file){
        BinaryBitmap bitmap = null;
        BufferedImage image;

        try {
            image = ImageIO.read(file.getInputStream());
            int[] pixels = image.getRGB(0, 0, image.getWidth(), image.getHeight(), null, 0, image.getWidth());
            RGBLuminanceSource source = new RGBLuminanceSource(image.getWidth(), image.getHeight(), pixels);
            bitmap = new BinaryBitmap(new HybridBinarizer(source));
        } catch (IOException e) {
            logger.error(e.getMessage());
            return null;
        }

        Reader reader = new EAN13Reader();
        String res = null;
        Hashtable<DecodeHintType, Boolean> hints = new Hashtable<>();
        hints.put(DecodeHintType.TRY_HARDER, Boolean.TRUE);

        Result result = null;
        try {
            result = reader.decode(bitmap, hints);
            if ((result != null) && (result.getText() != null)) {
                res = result.getText();
            }
        } catch (NotFoundException | ChecksumException | FormatException e) {
            logger.error(e.getMessage());
        }
        return res;
    }

    public void insertOrUpdateProductUser(ProductDTO product, int quantity){
        String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        ProductUserDTO productUser = productUserRepository.findProductUserDTOByPuk_UseridAndPuk_Code(
                    username,
                    product.getCode()
            );
        if(productUser==null){
            productUser = new ProductUserDTO(
                    new ProductUserKey(
                            username,
                            product.getCode()
                    ),
                    product.getProduct_name(),
                    product.getCategory(),
                    quantity
                    );
        }else {
            productUser.setQuantity(
                    productUser.getQuantity()+quantity
            );
        }
        productUserRepository.save(productUser);
    }

    public void insertOrUpdateProductUserHabits(ProductDTO product, int quantity){
        String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        UserApp user = userRepository.findByUsername(username);
        ProductUserHabitDTO productUserHabit = productUserHabitsRepository.findProductUserHabitDTOByPuk_UseridAndPuk_Code(
                username,
                product.getCode());
        if(productUserHabit==null){
            productUserHabit = new ProductUserHabitDTO(
                    new ProductUserKey(
                            user.getUsername(),
                            product.getCode()
                    ),
                    product.getProduct_name(),
                    product.getCategory(),
                    product.getBrand(),
                    quantity,
                    user.getAge(),
                    user.getGender()
            );
        }else {
            productUserHabit.setQuantity(
                    productUserHabit.getQuantity()+quantity
            );
        }
        productUserHabitsRepository.save(productUserHabit);
    }

    public List<ProductUserDTO> getUserProducts() {
        String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return productUserRepository.findProductUserDTOSByPuk_Userid(username);
    }

    public ProductUserDTO updateProductUser(LightProductDTO product) {
        String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        ProductUserDTO productUser = productUserRepository.findProductUserDTOByPuk_UseridAndPuk_Code(
                username,
                product.getCode()
        );
        productUser.setQuantity(productUser.getQuantity()+product.getQuantity());
        if(productUser.getQuantity()>0){
            productUserRepository.save(productUser);
        }
        else{
            productUserRepository.delete(productUser);
        }
        return productUser;
    }

    public void updateListUser(List<LightProductDTO> products) {
        String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        ProductUserDTO productUser;
        for (LightProductDTO product  : products) {
            productUser = productUserRepository.findProductUserDTOByPuk_UseridAndPuk_Code(
                    username,
                    product.getCode()
            );
            productUser.setQuantity(productUser.getQuantity()-product.getQuantity());
            if(productUser.getQuantity()>0){
                productUserRepository.save(productUser);
            }
            else{
                productUserRepository.delete(productUser);
            }
            ProductDTO productFull = productRepository.findProductDTOByCode(product.getCode());
            productUserDailyHabitsRepository.save(new ProductUserDailyHabitDTO(
                    new ProductUserKey(
                            username,
                            product.getCode()
                    ),
                    productFull.getProduct_name(),
                    productFull.getCategory(),
                    product.getQuantity()
            ));
        }
    }

    public NutritionGraphDTO getUserNutrition(DateDTO dateGreater, DateDTO dateLess){
        String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<ProductUserDailyHabitDTO> productUserDailyHabitDTOS =
                productUserDailyHabitsRepository.findProductUserDailyHabitDTOSByPuk_UseridAndDateLessThanEqualAndDateGreaterThanEqual(
                        username,
                        LocalDate.fromYearMonthDay(dateLess.getYear(),dateLess.getMonth(),dateLess.getDay()),
                        LocalDate.fromYearMonthDay(dateGreater.getYear(),dateGreater.getMonth(),dateGreater.getDay())
                        );

        List<LocalDate> dates = productUserDailyHabitDTOS.stream()
                .map(ProductUserDailyHabitDTO::getDate)
                .distinct()
                .collect(Collectors.toList());

        List<Integer> proteines = new ArrayList<>();
        List<Integer> lipides = new ArrayList<>();
        List<Integer> glucides = new ArrayList<>();
        List<Integer> calciums = new ArrayList<>();
        List<Integer> calories = new ArrayList<>();
        List<Integer> sels = new ArrayList<>();

        dates.forEach(d -> {
            proteines.add(productUserDailyHabitDTOS.stream()
                    .filter(e -> e.getDate().equals(d))
                    .map(e -> getProductNutrition(e.getPuk().getCode()))
                    .map(NutritionDTO::getProteine).reduce(0, Integer::sum));

            lipides.add(productUserDailyHabitDTOS.stream()
                    .filter(e -> e.getDate().equals(d))
                    .map(e -> getProductNutrition(e.getPuk().getCode()))
                    .map(NutritionDTO::getLipide).reduce(0, Integer::sum));

            glucides.add(productUserDailyHabitDTOS.stream()
                    .filter(e -> e.getDate().equals(d))
                    .map(e -> getProductNutrition(e.getPuk().getCode()))
                    .map(NutritionDTO::getGlucide).reduce(0, Integer::sum));

            calciums.add(productUserDailyHabitDTOS.stream()
                    .filter(e -> e.getDate().equals(d))
                    .map(e -> getProductNutrition(e.getPuk().getCode()))
                    .map(NutritionDTO::getCalcium).reduce(0, Integer::sum)/1000);

            calories.add(productUserDailyHabitDTOS.stream()
                    .filter(e -> e.getDate().equals(d))
                    .map(e -> getProductNutrition(e.getPuk().getCode()))
                    .map(NutritionDTO::getCalories).reduce(0, Integer::sum));

            sels.add(productUserDailyHabitDTOS.stream()
                    .filter(e -> e.getDate().equals(d))
                    .map(e -> getProductNutrition(e.getPuk().getCode()))
                    .map(NutritionDTO::getSel).reduce(0, Integer::sum));
        });

        return new NutritionGraphDTO(proteines, lipides, glucides, calciums, calories, sels, dates);
    }

    public NutritionDTO getProductNutrition(String code){
        String url = String.format("https://world.openfoodfacts.org/api/v0/product/%s.json", code);
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode;
        try {
            jsonNode = objectMapper.readTree(new URL(url)).get("product").get("nutriments");
            return objectMapper.treeToValue(jsonNode, NutritionDTO.class);
        } catch (IOException e) {
            logger.error(e.getMessage());
        }
        return null;
    }

    public List<ProductUserHabitDTO> getListHabitsUser(int n) {
        String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<ProductUserHabitDTO> productUserHabitDTOS = productUserHabitsRepository.
                findProductUserHabitDTOSByPuk_Userid(username);
        return productUserHabitDTOS.stream().filter(product -> product.getQuantity() >= n).collect(Collectors.toList());
    }

    public String pushAndPredict(MultipartFile file) throws IOException {
        BlobClient blobClient = blobContainerClient.getBlobClient(file.getOriginalFilename());
        blobClient.upload(file.getInputStream(), file.getSize());
        String urlToBlob = String.format("https://%s.blob.core.windows.net/images/%s", storageAccount,
                file.getOriginalFilename());
        URL url = new URL(String.format("http://localhost:%s/score", portModel));
        HttpURLConnection con = (HttpURLConnection) url.openConnection();
        con.setRequestMethod("POST");
        con.setRequestProperty("Content-Type", "application/json; utf-8");
        con.setRequestProperty("Accept", "application/json");
        con.setDoOutput(true);

        String jsonInputString = String.format("{\"url\": \"%s\"}", urlToBlob);

        try(OutputStream os = con.getOutputStream()) {
            byte[] input = jsonInputString.getBytes(StandardCharsets.UTF_8);
            os.write(input, 0, input.length);
        }

        StringBuilder response = new StringBuilder();
        try(BufferedReader br = new BufferedReader(
                new InputStreamReader(con.getInputStream(), StandardCharsets.UTF_8))) {
            String responseLine = null;
            while ((responseLine = br.readLine()) != null) {
                response.append(responseLine.trim());
            }
        }

        return new ObjectMapper().readValue(response.toString(), ModelResponseDTO.class).getLabel();
    }
}
