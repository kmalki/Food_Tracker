package com.esgi.foodtracker.repository;

import com.esgi.foodtracker.model.ProductUserDailyHabitDTO;
import com.esgi.foodtracker.model.ProductUserKey;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductUserDailyHabitsRepository extends CassandraRepository<ProductUserDailyHabitDTO, ProductUserKey> {

    ProductUserDailyHabitDTO findProductUserHabitDTOByPuk_UseridAndPuk_Code(String username, String code);

}
