package com.esgi.foodtracker.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class NutritionDTO {

    @JsonProperty("proteins_serving")
    private float proteine;
    @JsonProperty("fat_serving")
    private float lipide;
    @JsonProperty("sugars_serving")
    private float glucide;
    @JsonProperty("calcium_serving")
    private float calcium;
    @JsonProperty("energy-kcal_serving")
    private float calories;
    @JsonProperty("salt_serving")
    private float sel;

    private int quantity;

    public NutritionDTO() {
    }

    public NutritionDTO(float proteine, float lipide, float glucide, float calcium, float calories, float sel) {
        this.proteine = proteine;
        this.lipide = lipide;
        this.glucide = glucide;
        this.calcium = calcium;
        this.calories = calories;
        this.sel = sel;
    }

    public float getProteine() {
        return proteine*quantity;
    }

    public void setProteine(float proteine) {
        this.proteine = proteine;
    }

    public float getLipide() {
        return lipide*quantity;
    }

    public void setLipide(float lipide) {
        this.lipide = lipide;
    }

    public float getGlucide() {
        return glucide*quantity;
    }

    public void setGlucide(float glucide) {
        this.glucide = glucide;
    }

    public float getCalcium() {
        return calcium*quantity*1000;
    }

    public void setCalcium(float calcium) {
        this.calcium = calcium;
    }

    public float getCalories() {
        return calories*quantity;
    }

    public void setCalories(float calories) {
        this.calories = calories;
    }

    public float getSel() {
        return sel*quantity;
    }

    public void setSel(float sel) {
        this.sel = sel;
    }

    @Override
    public String toString() {
        return "NutritionDTO{" +
                "proteine=" + proteine +
                ", lipide=" + lipide +
                ", glucide=" + glucide +
                ", calcium=" + calcium +
                ", calories=" + calories +
                ", sel=" + sel +
                '}';
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
