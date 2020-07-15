package com.esgi.foodtracker.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class NutritionDTO {

    @JsonProperty("proteins_100g")
    private float proteine;
    @JsonProperty("fat_100g")
    private float lipide;
    @JsonProperty("sugars_100g")
    private float glucide;
    @JsonProperty("calcium_100g")
    private float calcium;
    @JsonProperty("energy-kcal_100g")
    private float calories;
    @JsonProperty("salt_100g")
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

    public void setProteine(int proteine) {
        this.proteine = proteine;
    }

    public float getLipide() {
        return lipide*quantity;
    }

    public void setLipide(int lipide) {
        this.lipide = lipide;
    }

    public float getGlucide() {
        return glucide*quantity;
    }

    public void setGlucide(int glucide) {
        this.glucide = glucide;
    }

    public float getCalcium() {
        return calcium*quantity*1000;
    }

    public void setCalcium(int calcium) {
        this.calcium = calcium;
    }

    public float getCalories() {
        return calories*quantity;
    }

    public void setCalories(int calories) {
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
