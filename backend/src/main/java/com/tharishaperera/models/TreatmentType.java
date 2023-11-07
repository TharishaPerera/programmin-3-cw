package com.tharishaperera.models;

public class TreatmentType {
    private Long treatmentTypeId;
    private String treatmentName;
    private double price;

    public TreatmentType(Long treatmentTypeId, String treatmentName, double price) {
        this.treatmentTypeId = treatmentTypeId;
        this.treatmentName = treatmentName;
        this.price = price;
    }
    public Long getTreatmentTypeId() {
        return treatmentTypeId;
    }
    public void setTreatmentTypeId(Long treatmentTypeId) {
        this.treatmentTypeId = treatmentTypeId;
    }
    public String getTreatmentName() {
        return treatmentName;
    }
    public void setTreatmentName(String treatmentName) {
        this.treatmentName = treatmentName;
    }
    public double getPrice() {
        return price;
    }
    public void setPrice(double price) {
        this.price = price;
    }
}
