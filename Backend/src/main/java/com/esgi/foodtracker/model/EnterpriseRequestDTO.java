package com.esgi.foodtracker.model;

public class EnterpriseRequestDTO {

    private String gender;
    private int ageGreaterThan;
    private int ageLessThan;
    private String keyaccess;

    public EnterpriseRequestDTO() {
    }

    public EnterpriseRequestDTO(String gender, int ageGreatherThan, int ageLessThan, String key) {
        this.gender = gender;
        this.ageGreaterThan = ageGreatherThan;
        this.ageLessThan = ageLessThan;
        this.keyaccess = key;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public int getAgeGreaterThan() {
        return ageGreaterThan;
    }

    public void setAgeGreaterThan(int ageGreatherThan) {
        this.ageGreaterThan = ageGreatherThan;
    }

    public int getAgeLessThan() {
        return ageLessThan;
    }

    public void setAgeLessThan(int ageLessThan) {
        this.ageLessThan = ageLessThan;
    }

    public String getKeyaccess() {
        return keyaccess;
    }

    public void setKeyaccess(String keyaccess) {
        this.keyaccess = keyaccess;
    }

    @Override
    public String toString() {
        return "EnterpriseRequestDTO{" +
                "gender='" + gender + '\'' +
                ", ageGreaterThan=" + ageGreaterThan +
                ", ageLessThan=" + ageLessThan +
                ", keyaccess='" + keyaccess + '\'' +
                '}';
    }
}
