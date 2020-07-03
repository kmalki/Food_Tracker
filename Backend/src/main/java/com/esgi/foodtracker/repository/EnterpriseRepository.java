package com.esgi.foodtracker.repository;

import com.esgi.foodtracker.model.Enterprise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EnterpriseRepository extends JpaRepository<Enterprise, Long> {
    Enterprise findEnterpriseByKeyaccess(String key);
}