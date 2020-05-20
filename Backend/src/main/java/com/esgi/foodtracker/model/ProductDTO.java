package com.esgi.foodtracker.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "products")
public class ProductDTO {
    @Id
    private ObjectId id;

    private String product_name;
    private String code;
    private String url;
    private String category;
    private String brand;

    public ProductDTO(){}

    public ProductDTO(String product_name, String code, String category, String brand) {
        this.id = new ObjectId();
        this.product_name = product_name;
        this.code = code;
        this.category = category;
        this.brand = brand;
        this.url = "";
    }

    public ProductDTO(String product_name, String code, String category, String brand, String url) {
        this.id = new ObjectId();
        this.product_name = product_name;
        this.code = code;
        this.category = category;
        this.brand = brand;
        this.url = url;
    }

    public ObjectId get_id() {
        return id;
    }

    public void set_id(ObjectId _id) {
        this.id = _id;
    }

    public String getProduct_name() {
        return product_name;
    }

    public void setProduct_name(String product_name) {
        this.product_name = product_name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    @Override
    public String toString() {
        return "ProductDTO{" +
                "id=" + id +
                ", product_name='" + product_name + '\'' +
                ", code=" + code +
                ", url='" + url + '\'' +
                ", category='" + category + '\'' +
                ", brand='" + brand + '\'' +
                '}';
    }
}
