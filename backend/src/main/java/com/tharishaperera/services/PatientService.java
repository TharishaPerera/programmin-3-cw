package com.tharishaperera.services;

import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;
import com.tharishaperera.models.Patient;
import com.tharishaperera.utils.CheckExistingEmail;
import com.tharishaperera.utils.Utils;

@Service
public class PatientService {
    public static List<Patient> patientList = new ArrayList<Patient>();
    
    // get all patients
    public List<Patient> getAllPatients() {
        return patientList;
    }

    // create a patient
    public Patient createPatient(Patient patient) {
        if (CheckExistingEmail.checkEmailExists(patient.getEmail())) {
            return null;
        }
        patient.setUserId(Utils.generateId());
        patientList.add(patient);
        return patient;
    }

    // get patient by id
    public Patient getPatientById(Long id) {
        for (Patient patient: patientList) {
            if (patient.getUserId().equals(id)) {
                return patient;
            }
        }
        return null;
    }

    // update patient
    public Patient updatePatient(Long id, Patient updatedPatient) {
        Patient existingPatient = getPatientById(id);
        if (existingPatient != null) {
            existingPatient.setFirstName(updatedPatient.getFirstName());
            existingPatient.setLastName(updatedPatient.getLastName());
            existingPatient.setEmail(updatedPatient.getEmail());
            existingPatient.setMobile(updatedPatient.getMobile());
            existingPatient.setUserType(updatedPatient.getUserType());
            existingPatient.setAddress(updatedPatient.getAddress());
            existingPatient.setDob(updatedPatient.getDob());
        }
        return existingPatient;
    }

    // delete patient
    public boolean deletePatient(Long id) {
        boolean deleteStatus = patientList.removeIf(patient -> patient.getUserId().equals(id));
        return deleteStatus; 
    }
}
