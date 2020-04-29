package com.esgi.foodtracker.rest;

import com.esgi.foodtracker.model.ProductDTO;
import com.esgi.foodtracker.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/getProduct")
    public List<ProductDTO> getProduct(){
        List<ProductDTO> l = productRepository.findAllByCode(3274080005003L);
        return l;
    }
}
