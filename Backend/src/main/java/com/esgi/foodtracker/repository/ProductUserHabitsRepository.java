package com.esgi.foodtracker.repository;

import com.esgi.foodtracker.model.ProductUserHabitDTO;
import com.esgi.foodtracker.model.ProductUserKey;
import org.springframework.data.cassandra.repository.AllowFiltering;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductUserHabitsRepository extends CassandraRepository<ProductUserHabitDTO, ProductUserKey> {

    ProductUserHabitDTO findProductUserHabitDTOByPuk_UseridAndPuk_Code(String username, String code);

    @AllowFiltering
    List<ProductUserHabitDTO> findProductUserHabitDTOSBySexe(String sexe);

    @AllowFiltering
    List<ProductUserHabitDTO> findProductUserHabitDTOSBySexeAndAgeGreaterThanEqualAndAgeLessThanEqual(String sexe, int age1, int age2);

    @AllowFiltering
    List<ProductUserHabitDTO> findProductUserHabitDTOSBySexeAndAgeLessThanEqual(String sexe, int age1);

    @AllowFiltering
    List<ProductUserHabitDTO> findProductUserHabitDTOSBySexeAndAgeGreaterThanEqual(String sexe, int age1);

    @AllowFiltering
    List<ProductUserHabitDTO> findProductUserHabitDTOSByAgeGreaterThanEqualAndAgeLessThanEqual(int age1, int age2);

    @AllowFiltering
    List<ProductUserHabitDTO> findProductUserHabitDTOSByAgeLessThanEqual(int age1);

    @AllowFiltering
    List<ProductUserHabitDTO> findProductUserHabitDTOSByAgeGreaterThanEqual(int age1);

}
