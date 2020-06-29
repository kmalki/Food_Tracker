package com.esgi.foodtracker.service;

import com.esgi.foodtracker.model.*;
import com.esgi.foodtracker.repository.*;
import com.google.zxing.*;
import com.google.zxing.common.HybridBinarizer;
import com.google.zxing.oned.EAN13Reader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.Hashtable;
import java.util.List;


@Service
public class ProductService {

    final static Logger logger = LoggerFactory.getLogger(ProductService.class);

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
                    user.getSexe()
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
}
