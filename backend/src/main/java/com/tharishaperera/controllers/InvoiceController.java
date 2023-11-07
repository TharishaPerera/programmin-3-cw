package com.tharishaperera.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tharishaperera.models.Invoice;
import com.tharishaperera.services.InvoiceService;

@RestController
@RequestMapping("/api/invoices")
public class InvoiceController {
    private InvoiceService invoiceService;

    // get all invoices
    @GetMapping
    public List<Invoice> getAllInvoices() {
        return invoiceService.getAllInvoices();
    }

    // get invoice by id
    @GetMapping("/{id}")
    public Invoice getInvoiceById(@PathVariable Long id) {
        return invoiceService.getInvoiceById(id);
    }

    // get invoice by appointment id
    @GetMapping("/appointment/{id}")
    public Invoice getInvoiceByAppointmentId(@PathVariable Long id) {
        return invoiceService.getInvoiceByAppointmentId(id);
    }

    // get invoice by patient id
    @GetMapping("/patient/{id}")
    public List<Invoice> getInvoiceByPatientId(@PathVariable Long id) {
        return invoiceService.getInvoicesByPatientId(id);
    }

    // create invoice
    @PostMapping
    public Invoice createInvoice(@RequestBody Invoice invoice) {
        return invoiceService.createInvoice(invoice);
    }

    // delete invoice 
    @DeleteMapping("/{id}")
    public boolean deleteInvoice(@PathVariable Long id) {
        return invoiceService.deleteInvoice(id);
    }
}
