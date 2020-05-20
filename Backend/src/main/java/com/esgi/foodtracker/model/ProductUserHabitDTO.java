package com.esgi.foodtracker.model;

import org.springframework.data.cassandra.core.mapping.*;
import java.util.UUID;

@Table("product_user_habit")
public class ProductUserHabitDTO {

    @Column
    @PrimaryKey
    private UUID idp;
    @Column
    private String userid;
    @Column
    private String code;
    @Column
    private String product_name;
    @Column
    private String category;
    @Column
    private int quantity;
    @Column
    private String brand;

    public ProductUserHabitDTO() {
    }

    public ProductUserHabitDTO(String userid,
                               String code, String product_name,
                               String category, String brand, int quantity) {
        this.idp = UUID.randomUUID();
        this.userid = userid;
        this.code = code;
        this.product_name = product_name;
        this.category = category;
        this.quantity = quantity;
        this.brand = brand;
    }

    public UUID getId() {
        return idp;
    }

    public void setId(UUID id) {
        this.idp = id;
    }

    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
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

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    @Override
    public String toString() {
        return "ProductUserHabitDTO{" +
                "idp=" + idp +
                ", userid='" + userid + '\'' +
                ", code=" + code +
                ", product_name='" + product_name + '\'' +
                ", category='" + category + '\'' +
                ", quantity=" + quantity +
                ", brand='" + brand + '\'' +
                '}';
    }
}