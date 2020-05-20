package com.esgi.foodtracker.repository;

import com.esgi.foodtracker.model.ProductUserDTO;
import com.esgi.foodtracker.model.ProductUserKey;
import org.springframework.data.cassandra.repository.AllowFiltering;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ProductUserRepository extends CassandraRepository<ProductUserDTO, ProductUserKey> {
    @AllowFiltering
    ProductUserDTO findProductUserDTOByPuk_UseridAndPuk_Code(String userid, String code);

    @AllowFiltering
    List<ProductUserDTO> findProductUserDTOSByPuk_Userid(String userid);
}
