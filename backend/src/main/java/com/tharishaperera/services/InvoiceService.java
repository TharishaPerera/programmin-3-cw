package com.tharishaperera.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.tharishaperera.models.Invoice;
import com.tharishaperera.models.TreatmentType;
import com.tharishaperera.utils.Utils;

@Service
public class InvoiceService {
    private List<Invoice> invoiceList = new ArrayList<Invoice>();

    // get all invoices
    public List<Invoice> getAllInvoices() {
        return invoiceList;
    }

    // get invoice by id
    public Invoice getInvoiceById(Long id) {
        for (Invoice invoice : invoiceList) {
            if (invoice.getInvoiceId().equals(id)) {
                return invoice;
            }
        }
        return null;
    }

    // get invoice by appointment id
    public Invoice getInvoiceByAppointmentId(Long id) {
        for (Invoice invoice: invoiceList) {
            if (invoice.getAppointment().getAppointmentId().equals(id)) {
                return invoice;
            }
        }
        return null;
    }

    // get invoice by patient id
    public List<Invoice> getInvoicesByPatientId(Long id) {
        List<Invoice> userInvoices = new ArrayList<Invoice>();
        for (Invoice invoice : invoiceList) {
            if (invoice.getAppointment().getPatient().getUserId().equals(id)) {
                userInvoices.add(invoice);
            }
        }
        return userInvoices;
    }

    // create invoice 
    public Invoice createInvoice(Invoice invoice) {
        invoice.setInvoiceId(Utils.generateId());
        invoice.setTotalAmount(calculateTotalAmount(invoice.getTreatment().getTreatmentType()));
        invoiceList.add(invoice);
        return invoice;
    }

    // delete invoice 
    public boolean deleteInvoice(Long id) {
        boolean deleteStatus = invoiceList.removeIf(invoice -> invoice.getInvoiceId().equals(id));
        return deleteStatus; 
    }

    // calculate total amount
    public double calculateTotalAmount(List<TreatmentType> treatmentTypes) {
        double total = 1000;    // registration fee
        for (TreatmentType treatmentType: treatmentTypes) {
            total += treatmentType.getPrice();
        }
        return total;
    }
}
