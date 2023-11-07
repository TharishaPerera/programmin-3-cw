package com.tharishaperera.models;

import java.time.LocalDate;

import com.tharishaperera.config.enums.Status;

public class Appointment {
    private Long appointmentId;
    private LocalDate appointmentDate;
    private String appointmentTime;
    private Patient patient;
    private Status status;
    private Status regFeeStatus;
    
    public Appointment(Long appointmentId, LocalDate appointmentDate, String appointmentTime, Patient patient,
            Status status, Status regFeeStatus) {
        this.appointmentId = appointmentId;
        this.appointmentDate = appointmentDate;
        this.appointmentTime = appointmentTime;
        this.patient = patient;
        this.status = status;
        this.regFeeStatus = regFeeStatus;
    }
    public Long getAppointmentId() {
        return appointmentId;
    }
    public void setAppointmentId(Long appointmentId) {
        this.appointmentId = appointmentId;
    }
    public LocalDate getAppointmentDate() {
        return appointmentDate;
    }
    public void setAppointmentDate(LocalDate appointmentDate) {
        this.appointmentDate = appointmentDate;
    }
    public String getAppointmentTime() {
        return appointmentTime;
    }
    public void setAppointmentTime(String appointmentTime) {
        this.appointmentTime = appointmentTime;
    }
    public Patient getPatient() {
        return patient;
    }
    public void setPatient(Patient patient) {
        this.patient = patient;
    }
    public Status getStatus() {
        return status;
    }
    public void setStatus(Status status) {
        this.status = status;
    }
    public Status getRegFeeStatus() {
        return regFeeStatus;
    }
    public void setRegFeeStatus(Status regFeeStatus) {
        this.regFeeStatus = regFeeStatus;
    }
} 
