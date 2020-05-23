package com.esgi.foodtracker.rest;

import com.esgi.foodtracker.model.LightProductDTO;
import com.esgi.foodtracker.model.ProductDTO;
import com.esgi.foodtracker.model.ProductUserDTO;
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
import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    final static Logger logger = LoggerFactory.getLogger(ProductController.class);

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductService productService;

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
    @PostMapping("/updateProduct")
    public ResponseEntity<ProductUserDTO> removeProduct(@RequestBody LightProductDTO product){
        ProductUserDTO product_updated = productService.updateProductUser(product);
        return ResponseEntity.status(HttpStatus.OK).body(product_updated);
    }

    @Loggable
    @PostMapping("/createProduct")
    public ResponseEntity<String> createProduct(@RequestBody ProductDTO product){
        productRepository.save(product);
        return ResponseEntity.status(HttpStatus.CREATED).body(String.format("Product EAN %s created",
                product.getCode()));
    }
}
