package com.tharishaperera.models;

import java.time.LocalDate;

import com.tharishaperera.config.enums.PaymentMethod;
import com.tharishaperera.config.enums.Status;

public class Payment {
    private Long paymentId;
    private Invoice invoice;
    private double amount;
    private LocalDate date = null;
    private PaymentMethod paymentMethod;
    private Status paymentStatus = Status.PENDING;

    public Payment(Long paymentId, Invoice invoice, double amount, LocalDate date, PaymentMethod paymentMethod,
            Status paymentStatus) {
        this.paymentId = paymentId;
        this.invoice = invoice;
        this.amount = amount;
        this.date = date;
        this.paymentMethod = paymentMethod;
        this.paymentStatus = paymentStatus;
    }
    public Long getPaymentId() {
        return paymentId;
    }
    public void setPaymentId(Long paymentId) {
        this.paymentId = paymentId;
    }
    public Invoice getInvoice() {
        return invoice;
    }
    public void setInvoice(Invoice invoice) {
        this.invoice = invoice;
    }
    public double getAmount() {
        return amount;
    }
    public void setAmount(double amount) {
        this.amount = amount;
    }
    public LocalDate getDate() {
        return date;
    }
    public void setDate(LocalDate date) {
        this.date = date;
    }
    public PaymentMethod getPaymentMethod() {
        return paymentMethod;
    }
    public void setPaymentMethod(PaymentMethod paymentMethod) {
        this.paymentMethod = paymentMethod;
    }
    public Status getPaymentStatus() {
        return paymentStatus;
    }
    public void setPaymentStatus(Status paymentStatus) {
        this.paymentStatus = paymentStatus;
    }
}
