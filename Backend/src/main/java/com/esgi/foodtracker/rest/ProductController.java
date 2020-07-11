package com.esgi.foodtracker.rest;

import com.esgi.foodtracker.model.*;
import com.esgi.foodtracker.repository.ProductRepository;
import com.esgi.foodtracker.service.ProductService;
import com.github.rozidan.springboot.logger.Loggable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    final static Logger logger = LoggerFactory.getLogger(ProductController.class);

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductService productService;

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
    @PostMapping("/getNutrition")
    public ResponseEntity<NutritionGraphDTO> getNutrition(@RequestBody BigDateDTO date){
        return ResponseEntity.status(HttpStatus.OK).body(productService.getUserNutrition(date.getGreater(), date.getLess()));
    }

    @Loggable
    @GetMapping("/getListHabits")
    public ResponseEntity<List<ProductUserHabitDTO>> getHabits(@RequestParam("mini") int n){
        return ResponseEntity.status(HttpStatus.OK).body(productService.getListHabitsUser(n));
    }

    @Loggable
    @PostMapping("/addFruits")
    public ResponseEntity<String> addFruit(@RequestParam("image") MultipartFile file,
                                           @RequestParam("quantity") int quantity) throws IOException {
        String label = productService.pushAndPredict(file);

        ProductDTO product = new ProductDTO(label, label, "Fruit; Legume", "None");

        productService.insertOrUpdateProductUser(product, quantity);
        productService.insertOrUpdateProductUserHabits(product, quantity);

        return ResponseEntity.status(HttpStatus.OK).body(String.format("Product %s added", label));
    }

}
