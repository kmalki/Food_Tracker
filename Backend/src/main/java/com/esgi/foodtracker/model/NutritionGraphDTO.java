package com.esgi.foodtracker.model;


import com.datastax.driver.core.LocalDate;

import java.util.List;

public class NutritionGraphDTO {

    private List<Double> proteine;
    private List<Double> lipide;
    private List<Double> glucide;
    private List<Double> calcium;
    private List<Double> calories;
    private List<Double> sel;
    private List<LocalDate> dates;

    public NutritionGraphDTO(List<Double> proteine, List<Double> lipide, List<Double> glucide, List<Double> calcium,
                             List<Double> calories, List<Double> sel, List<LocalDate> dates) {
        this.proteine = proteine;
        this.lipide = lipide;
        this.glucide = glucide;
        this.calcium = calcium;
        this.calories = calories;
        this.dates = dates;
        this.sel = sel;
    }

    public List<Double> getProteine() {
        return proteine;
    }

    public void setProteine(List<Double> proteine) {
        this.proteine = proteine;
    }

    public List<Double> getLipide() {
        return lipide;
    }

    public void setLipide(List<Double> lipide) {
        this.lipide = lipide;
    }

    public List<Double> getGlucide() {
        return glucide;
    }

    public void setGlucide(List<Double> glucide) {
        this.glucide = glucide;
    }

    public List<Double> getCalcium() {
        return calcium;
    }

    public void setCalcium(List<Double> calcium) {
        this.calcium = calcium;
    }

    public List<Double> getCalories() {
        return calories;
    }

    public void setCalories(List<Double> calories) {
        this.calories = calories;
    }

    public List<LocalDate> getDates() {
        return dates;
    }

    public void setDates(List<LocalDate> dates) {
        this.dates = dates;
    }

    public List<Double> getSel() {
        return sel;
    }

    public void setSel(List<Double> sel) {
        this.sel = sel;
    }

    @Override
    public String toString() {
        return "NutritionGraphDTO{" +
                "proteine=" + proteine +
                ", lipide=" + lipide +
                ", glucide=" + glucide +
                ", calcium=" + calcium +
                ", calories=" + calories +
                ", sel=" + sel +
                ", dates=" + dates +
                '}';
    }
}
