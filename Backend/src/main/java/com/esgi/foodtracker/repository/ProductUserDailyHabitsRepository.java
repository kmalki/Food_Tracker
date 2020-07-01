package com.esgi.foodtracker.repository;

import com.datastax.driver.core.LocalDate;
import com.esgi.foodtracker.model.ProductUserDailyHabitDTO;
import com.esgi.foodtracker.model.ProductUserKey;
import org.springframework.data.cassandra.repository.AllowFiltering;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductUserDailyHabitsRepository extends CassandraRepository<ProductUserDailyHabitDTO, ProductUserKey> {

    ProductUserDailyHabitDTO findProductUserHabitDTOByPuk_UseridAndPuk_Code(String username, String code);

    @AllowFiltering
    List<ProductUserDailyHabitDTO> findProductUserDailyHabitDTOSByPuk_UseridAndDateLessThanEqualAndDateGreaterThanEqual
            (String username, LocalDate dateLess, LocalDate dateGreater);

}
