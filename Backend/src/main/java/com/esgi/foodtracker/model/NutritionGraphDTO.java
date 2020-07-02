package com.esgi.foodtracker.model;


import com.datastax.driver.core.LocalDate;

import java.util.List;

public class NutritionGraphDTO {

    private List<Integer> proteine;
    private List<Integer> lipide;
    private List<Integer> glucide;
    private List<Integer> calcium;
    private List<Integer> calories;
    private List<Integer> sel;
    private List<LocalDate> dates;

    public NutritionGraphDTO(List<Integer> proteine, List<Integer> lipide, List<Integer> glucide, List<Integer> calcium,
                             List<Integer> calories, List<Integer> sel, List<LocalDate> dates) {
        this.proteine = proteine;
        this.lipide = lipide;
        this.glucide = glucide;
        this.calcium = calcium;
        this.calories = calories;
        this.dates = dates;
        this.sel = sel;
    }

    public List<Integer> getProteine() {
        return proteine;
    }

    public void setProteine(List<Integer> proteine) {
        this.proteine = proteine;
    }

    public List<Integer> getLipide() {
        return lipide;
    }

    public void setLipide(List<Integer> lipide) {
        this.lipide = lipide;
    }

    public List<Integer> getGlucide() {
        return glucide;
    }

    public void setGlucide(List<Integer> glucide) {
        this.glucide = glucide;
    }

    public List<Integer> getCalcium() {
        return calcium;
    }

    public void setCalcium(List<Integer> calcium) {
        this.calcium = calcium;
    }

    public List<Integer> getCalories() {
        return calories;
    }

    public void setCalories(List<Integer> calories) {
        this.calories = calories;
    }

    public List<LocalDate> getDates() {
        return dates;
    }

    public void setDates(List<LocalDate> dates) {
        this.dates = dates;
    }

    public List<Integer> getSel() {
        return sel;
    }

    public void setSel(List<Integer> sel) {
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
