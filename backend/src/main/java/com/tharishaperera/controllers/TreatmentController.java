package com.tharishaperera.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tharishaperera.models.Treatment;
import com.tharishaperera.services.TreatmentService;

@RestController
@RequestMapping("/api/treatments")
public class TreatmentController {
    @Autowired
    private TreatmentService treatmentService;

    // get all treatments
    @GetMapping
    public List<Treatment> getAllTreatments() {
        return treatmentService.getAllTreatments();
    }

    // get  treatment by id
    @GetMapping("/{id}")
    public Treatment getTreatmentById(@PathVariable Long id) {
        return treatmentService.getTreatmentById(id);
    }

    // create treatment
    @PostMapping
    public Treatment createTreatment(@RequestBody Treatment treatment) {
        return treatmentService.createTreatment(treatment);
    }

    // update treatment
    @PutMapping("/{id}")
    public Treatment updateTreatment(@PathVariable Long id, @RequestBody Treatment treatment) {
        return treatmentService.updateTreatment(id, treatment);
    }

    // delete treatment 
    @DeleteMapping("/{id}")
    public boolean deleteTreatment(@PathVariable Long id) {
        return treatmentService.deleteTreatment(id);
    }
}
