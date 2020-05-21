package com.esgi.foodtracker.repository;

import com.esgi.foodtracker.model.ProductUserHabitDTO;
import com.esgi.foodtracker.model.ProductUserKey;
import org.springframework.data.cassandra.repository.AllowFiltering;
import org.springframework.data.cassandra.repository.CassandraRepository;

import java.util.UUID;

public interface ProductUserHabitsRepository extends CassandraRepository<ProductUserHabitDTO, ProductUserKey> {
    @AllowFiltering
    ProductUserHabitDTO findProductUserHabitDTOByPuk_UseridAndPuk_Code(String username, String code);
}
