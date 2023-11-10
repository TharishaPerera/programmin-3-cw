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

import com.tharishaperera.models.TreatmentType;
import com.tharishaperera.services.TreatmentTypeService;

@RestController
@RequestMapping("/api/treatment-types")
@CrossOrigin(origins = "${frontend.allowed-origin}")
public class TreatmentTypeController {
    @Autowired
    private TreatmentTypeService treatmentTypeService;

    // get all treatment types
    @GetMapping
    public List<TreatmentType> getAllTreatmentTypes() {
        return treatmentTypeService.getAllTreatmentTypes();
    }

    // get all selected treatment types
    @PostMapping("/selected")
    public List<TreatmentType> getSelectedTreatmentTypes(@RequestBody Long[] ids) {
        return treatmentTypeService.getSelectTreatmentTypes(ids);
    }

    // create treatment type
    @PostMapping
    public TreatmentType createTreatmentType(@RequestBody TreatmentType treatmentType) {
        return treatmentTypeService.createTreatmentType(treatmentType);
    }

    // update treatment type
    @PutMapping("/{id}")
    public TreatmentType updateTreatmentType(@PathVariable Long id, @RequestBody TreatmentType treatmentType) {
        return treatmentTypeService.updateTreatmentType(id, treatmentType);
    }

    // delete treatment type
    @DeleteMapping("/{id}")
    public boolean deleteTreatmentType(@PathVariable Long id) {
        return treatmentTypeService.deleteTreatmentType(id);
    }
}
