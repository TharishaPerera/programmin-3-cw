package com.tharishaperera.models;

import java.util.List;

public class Treatment {
    private Long treatmentId;
    private Appointment appointment;
    private List<TreatmentType> treatmentType;
    
    public Treatment(Long treatmentId, Appointment appointment, List<TreatmentType> treatmentType) {
        this.treatmentId = treatmentId;
        this.appointment = appointment;
        this.treatmentType = treatmentType;
    }
    public Long getTreatmentId() {
        return treatmentId;
    }
    public void setTreatmentId(Long treatmentId) {
        this.treatmentId = treatmentId;
    }
    public Appointment getAppointment() {
        return appointment;
    }
    public void setAppointment(Appointment appointment) {
        this.appointment = appointment;
    }
    public List<TreatmentType> getTreatmentType() {
        return treatmentType;
    }
    public void setTreatmentType(List<TreatmentType> treatmentType) {
        this.treatmentType = treatmentType;
    }
}
