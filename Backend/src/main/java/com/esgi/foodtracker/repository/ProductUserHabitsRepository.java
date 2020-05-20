package com.esgi.foodtracker.repository;

import com.esgi.foodtracker.model.ProductUserHabitDTO;
import org.springframework.data.cassandra.repository.AllowFiltering;
import org.springframework.data.cassandra.repository.CassandraRepository;

import java.util.UUID;

public interface ProductUserHabitsRepository extends CassandraRepository<ProductUserHabitDTO, UUID> {
    @AllowFiltering
    ProductUserHabitDTO findProductUserHabitDTOByUseridAndAndCode(String username, String code);
}
