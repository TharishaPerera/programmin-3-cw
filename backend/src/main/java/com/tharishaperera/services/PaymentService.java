package com.tharishaperera.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.tharishaperera.models.Payment;
import com.tharishaperera.utils.Utils;

@Service
public class PaymentService {
    private List<Payment> paymentList = new ArrayList<Payment>();

    // get all payments
    public List<Payment> getAllPayments() {
        return paymentList;
    }

    // get payment by id
    public Payment getPaymentById(Long id) {
        for (Payment payment : paymentList) {
            if (payment.getPaymentId().equals(id)) {
                return payment;
            }
        }
        return null;
    }

    // get payment by appointment id
    public Payment getPaymentByAppointmentId(Long id) {
        for (Payment payment : paymentList) {
            if (payment.getInvoice().getAppointment().getAppointmentId().equals(id)) {
                return payment;
            }
        }
        return null;
    }

    // create payment
    public Payment createPayment(Payment payment) {
        payment.setPaymentId(Utils.generateId());
        payment.setAmount(payment.getInvoice().getTotalAmount());
        paymentList.add(payment);
        return payment;
    }

    // update payment status and date
    public Payment updatePayment(Long id, Payment payment) {
        Payment existing = getPaymentById(id);
        if (existing != null) {
            existing.setDate(payment.getDate());
            existing.setPaymentStatus(payment.getPaymentStatus());
        }
        return existing;
    }

}
