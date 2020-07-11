package com.esgi.foodtracker.config;

import com.azure.storage.blob.BlobContainerClient;
import com.azure.storage.blob.BlobServiceClientBuilder;
import com.github.rozidan.springboot.logger.EnableLogger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
@EnableLogger
public class FoodtrackerConfig {

    @Value("${connection.string.blob}")
    private String connectionStringBlob;

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public BlobContainerClient initBlob(){
        return new BlobServiceClientBuilder().connectionString(connectionStringBlob)
                .buildClient().getBlobContainerClient("images");
    }

}
