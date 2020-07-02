package com.esgi.foodtracker.rest;

import com.esgi.foodtracker.model.EnterpriseRequestDTO;
import com.esgi.foodtracker.model.ProductUserHabitDTO;
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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/enterprise")
public class EnterpriseController {

    final static Logger logger = LoggerFactory.getLogger(EnterpriseController.class);

    @Autowired
    private ProductUserHabitsRepository productUserHabitsRepository;

    @Loggable
    @GetMapping("/export")
    public void exportData(@RequestBody EnterpriseRequestDTO enterpriseRequestDTO, HttpServletResponse response){
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
            if(enterpriseRequestDTO.getGender()!=null){
                if(enterpriseRequestDTO.getAgeGreaterThan()==0 && enterpriseRequestDTO.getAgeLessThan()!=0){
                    products = productUserHabitsRepository.
                            findProductUserHabitDTOSBySexeAndAgeLessThanEqual(
                                    enterpriseRequestDTO.getGender(),
                                    enterpriseRequestDTO.getAgeLessThan()
                            );
                }else{
                    if(enterpriseRequestDTO.getAgeGreaterThan()!=0 && enterpriseRequestDTO.getAgeLessThan()==0){
                        products = productUserHabitsRepository.
                                findProductUserHabitDTOSBySexeAndAgeGreaterThanEqual(
                                        enterpriseRequestDTO.getGender(),
                                        enterpriseRequestDTO.getAgeGreaterThan()
                                );
                    }else{
                        if(enterpriseRequestDTO.getAgeGreaterThan()==0 && enterpriseRequestDTO.getAgeLessThan()==0){
                            products = productUserHabitsRepository.
                                    findProductUserHabitDTOSBySexe(
                                            enterpriseRequestDTO.getGender()
                                    );
                        }else{
                            products = productUserHabitsRepository.
                                    findProductUserHabitDTOSBySexeAndAgeGreaterThanEqualAndAgeLessThanEqual(
                                            enterpriseRequestDTO.getGender(),
                                            enterpriseRequestDTO.getAgeGreaterThan(),
                                            enterpriseRequestDTO.getAgeLessThan()
                                    );
                        }
                    }
                }
            }else{
                if(enterpriseRequestDTO.getAgeGreaterThan()==0 && enterpriseRequestDTO.getAgeLessThan()!=0){
                    products = productUserHabitsRepository.
                            findProductUserHabitDTOSByAgeLessThanEqual(
                                    enterpriseRequestDTO.getAgeLessThan()
                            );
                }else{
                    if(enterpriseRequestDTO.getAgeGreaterThan()!=0 && enterpriseRequestDTO.getAgeLessThan()==0){
                        products = productUserHabitsRepository.
                                findProductUserHabitDTOSByAgeGreaterThanEqual(
                                        enterpriseRequestDTO.getAgeGreaterThan()
                                );
                    }else{
                        if(enterpriseRequestDTO.getAgeGreaterThan()==0 && enterpriseRequestDTO.getAgeLessThan()==0){
                            products = productUserHabitsRepository.findAll();
                        }else{
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
