package com.esgi.foodtracker.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "test")
public class ProductDTO {
    @Id
    private ObjectId _id;

    private String product_name;
    private Long code;
    private String url;

    public ProductDTO() {
    }

    public ProductDTO(ObjectId _id, String product_name, Long code, String url) {
        this._id = _id;
        this.product_name = product_name;
        this.code = code;
        this.url = url;
    }

    public ObjectId get_id() {
        return _id;
    }

    public void set_id(ObjectId _id) {
        this._id = _id;
    }

    public String getProduct_name() {
        return product_name;
    }

    public void setProduct_name(String product_name) {
        this.product_name = product_name;
    }

    public Long getCode() {
        return code;
    }

    public void setCode(Long code) {
        this.code = code;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    @Override
    public String toString() {
        return "ProductDTO{" +
                "product_name='" + product_name + '\'' +
                ", code=" + code +
                ", url='" + url + '\'' +
                '}';
    }
}
