package com.tharishaperera.models;

import java.time.LocalDate;

public class Invoice {
    private Long invoiceId;
    private Appointment appointment;
    private LocalDate dateIssued;
    private Treatment treatment;
    private Double totalAmount = 0.00;

    public Invoice(Long invoiceId, Appointment appointment, LocalDate dateIssued, Treatment treatment,
            Double totalAmount) {
        this.invoiceId = invoiceId;
        this.appointment = appointment;
        this.dateIssued = dateIssued;
        this.treatment = treatment;
        this.totalAmount = totalAmount;
    }
    public Long getInvoiceId() {
        return invoiceId;
    }
    public void setInvoiceId(Long invoiceId) {
        this.invoiceId = invoiceId;
    }
    public Appointment getAppointment() {
        return appointment;
    }
    public void setAppointment(Appointment appointment) {
        this.appointment = appointment;
    }
    public LocalDate getDateIssued() {
        return dateIssued;
    }
    public void setDateIssued(LocalDate dateIssued) {
        this.dateIssued = dateIssued;
    }
    public Treatment getTreatment() {
        return treatment;
    }
    public void setTreatment(Treatment treatment) {
        this.treatment = treatment;
    }
    public Double getTotalAmount() {
        return totalAmount;
    }
    public void setTotalAmount(Double totalAmount) {
        this.totalAmount = totalAmount;
    }
}
