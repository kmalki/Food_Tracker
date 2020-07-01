package com.esgi.foodtracker.rest;

import com.esgi.foodtracker.model.*;
import com.esgi.foodtracker.repository.ProductRepository;
import com.esgi.foodtracker.repository.ProductUserHabitsRepository;
import com.esgi.foodtracker.service.ProductService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.rozidan.springboot.logger.Loggable;
import com.opencsv.CSVWriter;
import com.opencsv.bean.StatefulBeanToCsv;
import com.opencsv.bean.StatefulBeanToCsvBuilder;
import com.opencsv.exceptions.CsvDataTypeMismatchException;
import com.opencsv.exceptions.CsvRequiredFieldEmptyException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    final static Logger logger = LoggerFactory.getLogger(ProductController.class);

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductService productService;

    @Autowired
    private ProductUserHabitsRepository productUserHabitsRepository;

    @Loggable
    @GetMapping("/getProducts")
    public ResponseEntity<List<ProductUserDTO>> getProduct(){
        List<ProductUserDTO> products = productService.getUserProducts();
        return ResponseEntity.status(HttpStatus.OK).body(products);
    }

    @Loggable
    @PostMapping("/addProduct")
    public ResponseEntity<String> addProduct(@RequestParam("image") MultipartFile file,
                                             @RequestParam("quantity") int quantity) {
        String code = productService.decodeBarcode(file);
        if(code==null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("EAN not detected, please try again.");
        }
        ProductDTO products = productRepository.findProductDTOByCode(code);
        if(products==null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    String.format("Product not found with EAN %s", code));
        }
        productService.insertOrUpdateProductUser(products, quantity);
        productService.insertOrUpdateProductUserHabits(products, quantity);
        return ResponseEntity.status(HttpStatus.OK).body(String.format("Product EAN %s added", code));
    }

    @Loggable
    @PostMapping("/addProductWithCode")
    public ResponseEntity<String> addProductWithCode(@RequestBody LightProductDTO product) {
        ProductDTO products = productRepository.findProductDTOByCode(product.getCode());
        if(products==null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    String.format("Product not found with EAN %s", product.getCode()));
        }
        productService.insertOrUpdateProductUser(products, product.getQuantity());
        productService.insertOrUpdateProductUserHabits(products, product.getQuantity());
        return ResponseEntity.status(HttpStatus.OK).body(String.format("Product EAN %s added", product.getCode()));
    }

    @Loggable
    @PostMapping("/updateProduct")
    public ResponseEntity<ProductUserDTO> updateProduct(@RequestBody LightProductDTO product){
        ProductUserDTO product_updated = productService.updateProductUser(product);
        return ResponseEntity.status(HttpStatus.OK).body(product_updated);
    }

    @Loggable
    @PostMapping("/updateList")
    public ResponseEntity<String> updateList(@RequestBody List<LightProductDTO> products){
        productService.updateListUser(products);
        return ResponseEntity.status(HttpStatus.OK).body("List updated");
    }

    @Loggable
    @PostMapping("/createProduct")
    public ResponseEntity<String> createProduct(@RequestBody ProductDTO product){
        productRepository.save(product);
        return ResponseEntity.status(HttpStatus.CREATED).body(String.format("Product EAN %s created",
                product.getCode()));
    }

    @Loggable
    @GetMapping("/export")
    public void exportData(HttpServletResponse response){
        //set file name and content type
        String filename = "data.csv";

        response.setContentType("text/csv");
        response.setHeader(HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=\"" + filename + "\"");

        try {
        //create a csv writer
        StatefulBeanToCsv<ProductUserHabitDTO> writer =
                new StatefulBeanToCsvBuilder<ProductUserHabitDTO>(response.getWriter())
                    .withQuotechar(CSVWriter.NO_QUOTE_CHARACTER)
                    .withSeparator(';')
                    .withOrderedResults(false)
                    .build();

        //write data to csv file
            writer.write(productUserHabitsRepository.findAll());
        } catch (CsvDataTypeMismatchException | CsvRequiredFieldEmptyException | IOException e) {
            logger.error(e.getMessage());
        }
    }

    @Loggable
    @PostMapping("/getNutrition")
    public ResponseEntity<NutritionGraphDTO> getNutrition(@RequestBody DateDTO date){
        return ResponseEntity.status(HttpStatus.OK).body(productService.getUserNutrition(date));
    }
}
