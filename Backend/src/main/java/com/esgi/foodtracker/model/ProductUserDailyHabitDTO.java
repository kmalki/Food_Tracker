package com.esgi.foodtracker.model;

import com.datastax.driver.core.LocalDate;
import org.springframework.data.cassandra.core.mapping.Column;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

import java.util.Date;

@Table("product_user_daily_habit")
public class ProductUserDailyHabitDTO {

    @Column
    @PrimaryKey
    private ProductUserKey puk;
    @Column
    private String product_name;
    @Column
    private String category;
    @Column
    private int quantity;
    @Column
    private LocalDate date;

    public ProductUserDailyHabitDTO() {
    }

    public ProductUserDailyHabitDTO(ProductUserKey puk, String product_name,
                          String category, int quantity) {
        this.puk = puk ;
        this.product_name = product_name;
        this.category = category.replace(',',';');
        this.quantity = quantity;
        this.date = LocalDate.fromMillisSinceEpoch(new Date().getTime());
    }

    public ProductUserKey getPuk() {
        return puk;
    }

    public void setPuk(ProductUserKey puk) {
        this.puk = puk;
    }

    public String getProduct_name() {
        return product_name;
    }

    public void setProduct_name(String product_name) {
        this.product_name = product_name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    @Override
    public String toString() {
        return "ProductUserDailyHabitDTO{" +
                "puk=" + puk +
                ", product_name='" + product_name + '\'' +
                ", category='" + category + '\'' +
                ", quantity=" + quantity +
                ", date=" + date +
                '}';
    }
}