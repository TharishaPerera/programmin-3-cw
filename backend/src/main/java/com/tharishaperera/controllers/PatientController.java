package com.tharishaperera.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tharishaperera.models.Patient;
import com.tharishaperera.services.PatientService;


@RestController
@RequestMapping("/api/patients")
@CrossOrigin(origins = "${frontend.allowed-origin}")
public class PatientController {

    @Autowired
    private PatientService patientService;

    // get all patients
    @GetMapping
    public List<Patient> getAllPatients() {
        return patientService.getAllPatients();
    }

    // create new patient
    @PostMapping
    public Patient createPatient(@RequestBody Patient patient) {
        return patient = patientService.createPatient(patient);
    }

    // get patient by id
    @GetMapping("/{id}")
    public Patient getPatient(@PathVariable Long id) {
        return patientService.getPatientById(id);
    }

    // update patient
    @PutMapping("/{id}")
    public Patient updatePatient(@PathVariable Long id, @RequestBody Patient patient) {
        return patientService.updatePatient(id, patient);
    }

    // delete patient
    @DeleteMapping("/{id}")
    public boolean deletePatient(@PathVariable Long id) {
        return patientService.deletePatient(id);
    }
}
