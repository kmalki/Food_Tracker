package com.esgi.foodtracker.rest;

import com.esgi.foodtracker.model.Enterprise;
import com.esgi.foodtracker.model.EnterpriseRequestDTO;
import com.esgi.foodtracker.model.ProductUserHabitDTO;
import com.esgi.foodtracker.repository.EnterpriseRepository;
import com.esgi.foodtracker.repository.ProductUserHabitsRepository;
import com.github.rozidan.springboot.logger.Loggable;
import com.opencsv.CSVWriter;
import com.opencsv.bean.StatefulBeanToCsv;
import com.opencsv.bean.StatefulBeanToCsvBuilder;
import com.opencsv.exceptions.CsvDataTypeMismatchException;
import com.opencsv.exceptions.CsvRequiredFieldEmptyException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/enterprise")
public class EnterpriseController {

    final static Logger logger = LoggerFactory.getLogger(EnterpriseController.class);

    @Autowired
    private ProductUserHabitsRepository productUserHabitsRepository;

    @Autowired
    private EnterpriseRepository enterpriseRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Loggable
    @PostMapping("/addEnterprise")
    public ResponseEntity<String> addEnterprise(@RequestBody Enterprise enterpriseDTO){
        String key = enterpriseDTO.getKeyaccess();
        for(int i=0;i<10;i++){
            logger.info(bCryptPasswordEncoder.encode(key));
        }
        enterpriseDTO.setKeyaccess(bCryptPasswordEncoder.encode(enterpriseDTO.getKeyaccess()));
        enterpriseRepository.save(enterpriseDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(String.format("Created, key=%s", key));
    }

    @Loggable
    @PostMapping("/export")
    public void exportData(@RequestBody EnterpriseRequestDTO enterpriseRequestDTO, HttpServletResponse response){

        List<Enterprise> enterpriseList = enterpriseRepository.findAll();
        Optional<Enterprise> enterprise = enterpriseList.stream()
                .filter(e -> bCryptPasswordEncoder.matches(enterpriseRequestDTO.getKeyaccess(), e.getKeyaccess()))
                .findFirst();

        if(Optional.ofNullable(enterprise).isPresent()) {
            //set file name and content type
            String filename = "export_data.csv";

            response.setContentType("text/csv");
            response.setHeader(HttpHeaders.CONTENT_DISPOSITION,
                    "attachment; filename=\"" + filename + "\"");

            try {
//            create a csv writer
                StatefulBeanToCsv<ProductUserHabitDTO> writer =
                        new StatefulBeanToCsvBuilder<ProductUserHabitDTO>(response.getWriter())
                                .withQuotechar(CSVWriter.NO_QUOTE_CHARACTER)
                                .withSeparator(CSVWriter.DEFAULT_SEPARATOR)
                                .withOrderedResults(false)
                                .build();

                List<ProductUserHabitDTO> products;
                if (enterpriseRequestDTO.getGender() != null) {
                    if (enterpriseRequestDTO.getAgeGreaterThan() == 0 && enterpriseRequestDTO.getAgeLessThan() != 0) {
                        products = productUserHabitsRepository.
                                findProductUserHabitDTOSBySexeAndAgeLessThanEqual(
                                        enterpriseRequestDTO.getGender(),
                                        enterpriseRequestDTO.getAgeLessThan()
                                );
                    } else {
                        if (enterpriseRequestDTO.getAgeGreaterThan() != 0 && enterpriseRequestDTO.getAgeLessThan() == 0) {
                            products = productUserHabitsRepository.
                                    findProductUserHabitDTOSBySexeAndAgeGreaterThanEqual(
                                            enterpriseRequestDTO.getGender(),
                                            enterpriseRequestDTO.getAgeGreaterThan()
                                    );
                        } else {
                            if (enterpriseRequestDTO.getAgeGreaterThan() == 0 && enterpriseRequestDTO.getAgeLessThan() == 0) {
                                products = productUserHabitsRepository.
                                        findProductUserHabitDTOSBySexe(
                                                enterpriseRequestDTO.getGender()
                                        );
                            } else {
                                products = productUserHabitsRepository.
                                        findProductUserHabitDTOSBySexeAndAgeGreaterThanEqualAndAgeLessThanEqual(
                                                enterpriseRequestDTO.getGender(),
                                                enterpriseRequestDTO.getAgeGreaterThan(),
                                                enterpriseRequestDTO.getAgeLessThan()
                                        );
                            }
                        }
                    }
                } else {
                    if (enterpriseRequestDTO.getAgeGreaterThan() == 0 && enterpriseRequestDTO.getAgeLessThan() != 0) {
                        products = productUserHabitsRepository.
                                findProductUserHabitDTOSByAgeLessThanEqual(
                                        enterpriseRequestDTO.getAgeLessThan()
                                );
                    } else {
                        if (enterpriseRequestDTO.getAgeGreaterThan() != 0 && enterpriseRequestDTO.getAgeLessThan() == 0) {
                            products = productUserHabitsRepository.
                                    findProductUserHabitDTOSByAgeGreaterThanEqual(
                                            enterpriseRequestDTO.getAgeGreaterThan()
                                    );
                        } else {
                            if (enterpriseRequestDTO.getAgeGreaterThan() == 0 && enterpriseRequestDTO.getAgeLessThan() == 0) {
                                products = productUserHabitsRepository.findAll();
                            } else {
                                products = productUserHabitsRepository.
                                        findProductUserHabitDTOSByAgeGreaterThanEqualAndAgeLessThanEqual(
                                                enterpriseRequestDTO.getAgeGreaterThan(),
                                                enterpriseRequestDTO.getAgeLessThan()
                                        );
                            }
                        }
                    }
                }
                //write data to csv file
                writer.write(products);
            } catch (CsvDataTypeMismatchException | CsvRequiredFieldEmptyException | IOException e) {
                logger.error(e.getMessage());
            }
        }
    }
}
