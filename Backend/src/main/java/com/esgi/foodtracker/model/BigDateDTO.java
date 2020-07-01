package com.esgi.foodtracker.model;

import java.util.Date;

public class BigDateDTO {

    private DateDTO greater;
    private DateDTO less;

    public BigDateDTO() {
    }

    public BigDateDTO(DateDTO greater, DateDTO less) {
        this.greater = greater;
        this.less = less;
    }

    public DateDTO getGreater() {
        return greater;
    }

    public void setGreater(DateDTO greater) {
        this.greater = greater;
    }

    public DateDTO getLess() {
        return less;
    }

    public void setLess(DateDTO less) {
        this.less = less;
    }

    @Override
    public String toString() {
        return "BigDateDTO{" +
                "greater=" + greater +
                ", less=" + less +
                '}';
    }
}
