package com.esgi.foodtracker.model;

public class LightProductDTO {

    private int quantity;

    private String code;

    public LightProductDTO(String code, int quantity) {
        this.quantity = quantity;
        this.code = code;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    @Override
    public String toString() {
        return "LightProductDTO{" +
                "quantity=" + quantity +
                ", code='" + code + '\'' +
                '}';
    }
}
