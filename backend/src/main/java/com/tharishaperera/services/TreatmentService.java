package com.tharishaperera.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.tharishaperera.models.Treatment;
import com.tharishaperera.utils.utils;

@Service
public class TreatmentService {
    private List<Treatment> treatmentsList = new ArrayList<>();

    // get all treatments 
    public List<Treatment> getAllTreatments() {
        return treatmentsList;
    }

    // get treatment by id
    public Treatment getTreatmentById(Long id) {
        for (Treatment treatment: treatmentsList) {
            if (treatment.getTreatmentId().equals(id)) {
                return treatment;
            }
        }
        return null;
    }

    // get treatments by appointment id
    public Treatment getTreatmentByAppointmentId(Long id) {
        for (Treatment treatment: treatmentsList) {
            if (treatment.getAppointment().getAppointmentId().equals(id)) {
                return treatment;
            }
        }
        return null;
    }
    
    // create a treatment 
    public Treatment createTreatment(Treatment treatment) {
        treatment.setTreatmentId(utils.generateId());
        treatmentsList.add(treatment);
        return treatment;
    }
    
    // update treatment
    public Treatment updateTreatment(Long id, Treatment treatment) {
        Treatment existing = getTreatmentById(id);
        if (existing != null) {
            existing.setTreatmentType(treatment.getTreatmentType());
            existing.setAppointment(treatment.getAppointment());
        }
        return existing;
    }

    // delete treatment 
    public boolean deleteTreatment(Long id) {
        boolean deleteStatus = treatmentsList.removeIf(treatment -> treatment.getTreatmentId().equals(id));
        return deleteStatus; 
    }
}
