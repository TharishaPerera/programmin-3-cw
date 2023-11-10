package com.tharishaperera.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tharishaperera.models.Payment;
import com.tharishaperera.services.PaymentService;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "${frontend.allowed-origin}")
public class PaymentController {
    @Autowired
    private PaymentService paymentService;

    // get payment by appointment id
    @GetMapping("/{id}")
    public Payment getPaymentByAppointmentId(@PathVariable Long id) {
        return paymentService.getPaymentByAppointmentId(id);
    }

    // create payment
    @PostMapping
    public Payment createPayment(@RequestBody Payment payment) {
        return paymentService.createPayment(payment);
    }

    // update payment
    @PutMapping("/{id}")
    public Payment updatePayment(@PathVariable Long id, @RequestBody Payment payment) {
        return paymentService.updatePayment(id, payment);
    }
}
