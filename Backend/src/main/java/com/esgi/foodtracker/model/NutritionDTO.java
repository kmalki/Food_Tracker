package com.esgi.foodtracker.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class NutritionDTO {

    @JsonProperty("proteins")
    private int proteine;
    @JsonProperty("fat")
    private int lipide;
    @JsonProperty("sugars")
    private int glucide;
    @JsonProperty("calcium")
    private int calcium;
    @JsonProperty("energy-kcal")
    private int calories;

    public NutritionDTO() {
    }

    public NutritionDTO(int proteine, int lipide, int glucide, int calcium, int calories) {
        this.proteine = proteine;
        this.lipide = lipide;
        this.glucide = glucide;
        this.calcium = calcium;
        this.calories = calories;
    }

    public int getProteine() {
        return proteine;
    }

    public void setProteine(int proteine) {
        this.proteine = proteine;
    }

    public int getLipide() {
        return lipide;
    }

    public void setLipide(int lipide) {
        this.lipide = lipide;
    }

    public int getGlucide() {
        return glucide;
    }

    public void setGlucide(int glucide) {
        this.glucide = glucide;
    }

    public int getCalcium() {
        return calcium;
    }

    public void setCalcium(int calcium) {
        this.calcium = calcium;
    }

    public int getCalories() {
        return calories;
    }

    public void setCalories(int calories) {
        this.calories = calories;
    }

    @Override
    public String toString() {
        return "NutritionDTO{" +
                "proteine=" + proteine +
                ", lipide=" + lipide +
                ", glucide=" + glucide +
                ", calcium=" + calcium +
                ", calories=" + calories +
                '}';
    }
}
