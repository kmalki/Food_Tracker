package com.esgi.foodtracker.repository;

import com.esgi.foodtracker.model.ProductDTO;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ProductRepository extends MongoRepository<ProductDTO, ObjectId> {
    List<ProductDTO> findAllByCode(String code);
    ProductDTO findProductDTOByCode(String code);
}
