package com.tharishaperera.utils;

import com.tharishaperera.models.Dentist;
import com.tharishaperera.models.Patient;
import com.tharishaperera.models.Receptionist;
import com.tharishaperera.services.DentistService;
import com.tharishaperera.services.PatientService;
import com.tharishaperera.services.ReceptionistService;

public class CheckExistingEmail {
    public static boolean checkEmailExists(String email) {
        for (Dentist dentist : DentistService.dentistList) {
            if (email.equals(dentist.getEmail())) {
                return true;
            }
        }
        for (Receptionist receptionist: ReceptionistService.receptionistsList) {
            if (email.equals(receptionist.getEmail())) {
                return true;
            }
        }
        for (Patient patient: PatientService.patientList) {
            if (email.equals(patient.getEmail())) {
                return true;
            }
        }
        return false;
    }
}
