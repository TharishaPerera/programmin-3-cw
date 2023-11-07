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

import com.tharishaperera.models.Dentist;
import com.tharishaperera.services.DentistService;


@RestController
@RequestMapping("/api/dentists")
public class DentistController {

    @Autowired
    private DentistService dentistService;

    // get all dentists
    @GetMapping
    public List<Dentist> getAllDentists() {
        return dentistService.getAllDentists();
    }

    // create new dentist
    @PostMapping
    public Dentist createDentist(@RequestBody Dentist dentist) {
        return dentist = dentistService.createDentist(dentist);
    }

    // get dentist by id
    @GetMapping("/{id}")
    public Dentist getDentist(@PathVariable Long id) {
        return dentistService.getDentistById(id);
    }

    // update dentist
    @PutMapping("/{id}")
    public Dentist updateDentist(@PathVariable Long id, @RequestBody Dentist dentist) {
        return dentistService.updateDentist(id, dentist);
    }

    // delete dentist
    @DeleteMapping("/{id}")
    public boolean deleteDentist(@PathVariable Long id) {
        return dentistService.deleteDentist(id);
    }
}
