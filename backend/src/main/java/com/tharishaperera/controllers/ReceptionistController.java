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

import com.tharishaperera.models.Receptionist;
import com.tharishaperera.services.ReceptionistService;


@RestController
@RequestMapping("/api/receptionists")
public class ReceptionistController {

    @Autowired
    private ReceptionistService receptionistService;

    // get all receptionists
    @GetMapping
    public List<Receptionist> getAllReceptionists() {
        return receptionistService.getAllReceptionists();
    }

    // create new receptionist
    @PostMapping
    public Receptionist createReceptionist(@RequestBody Receptionist receptionist) {
        return receptionist = receptionistService.createReceptionist(receptionist);
    }

    // get receptionist by id
    @GetMapping("/{id}")
    public Receptionist getReceptionistById(@PathVariable Long id) {
        return receptionistService.getReceptionistById(id);
    }

    // update receptionist
    @PutMapping("/{id}")
    public Receptionist updateReceptionist(@PathVariable Long id, @RequestBody Receptionist receptionist) {
        return receptionistService.updateReceptionist(id, receptionist);
    }

    // delete receptionist
    @DeleteMapping("/{id}")
    public boolean deleteReceptionist(@PathVariable Long id) {
        return receptionistService.deleteReceptionist(id);
    }
}
