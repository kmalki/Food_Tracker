package com.esgi.foodtracker.model;

import org.springframework.data.cassandra.core.mapping.*;


@Table("product_user")
public class ProductUserDTO {

    @Column
    @PrimaryKey
    private ProductUserKey puk;
    @Column
    private String product_name;
    @Column
    private String category;
    @Column
    private int quantity;

    public ProductUserDTO() {
    }

    public ProductUserDTO(ProductUserKey puk, String product_name,
                          String category, int quantity) {
        this.puk = puk ;
        this.product_name = product_name;
        this.category = category.replace(',',';');
        this.quantity = quantity;
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

    @Override
    public String toString() {
        return "ProductUserDTO{" +
                "puk=" + puk +
                ", product_name='" + product_name + '\'' +
                ", category='" + category + '\'' +
                ", quantity=" + quantity +
                '}';
    }
}