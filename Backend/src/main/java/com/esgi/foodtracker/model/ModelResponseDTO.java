package com.esgi.foodtracker.model;

public class ModelResponseDTO {

    private String label;
    private long elapsed_time;

    public ModelResponseDTO() {
    }

    public ModelResponseDTO(String label, long elapsed_time) {
        this.label = label;
        this.elapsed_time = elapsed_time;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public long getElapsed_time() {
        return elapsed_time;
    }

    public void setElapsed_time(long elapsed_time) {
        this.elapsed_time = elapsed_time;
    }

    @Override
    public String toString() {
        return "ModelResponseDTO{" +
                "label='" + label + '\'' +
                ", elapsed_time=" + elapsed_time +
                '}';
    }
}
