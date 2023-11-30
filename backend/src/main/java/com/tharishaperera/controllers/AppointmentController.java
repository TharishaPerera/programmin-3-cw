package com.tharishaperera.controllers;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tharishaperera.models.Appointment;
import com.tharishaperera.services.AppointmentService;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "${frontend.allowed-origin}")
public class AppointmentController {
    @Autowired
    private AppointmentService appointmentService;

    // get all appointments
    @GetMapping
    public List<Appointment> getAllAppointments() {
        return appointmentService.getAllAppointments();
    }

    // get appointment by id
    @GetMapping("/{id}")
    public Appointment getAppointmentById(@PathVariable Long id) {
        return appointmentService.getAppointmentById(id);
    }

    // get appointment by date
    @GetMapping("/bydate")
    public List<Appointment> getAppointmentsByDate(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return appointmentService.getAppointmentsByDate(date);
    }

    // get appointment by patient name
    @GetMapping("/byname")
    public List<Appointment> getAppointmentsByPatientName(@RequestParam String name) {
        return appointmentService.getAppointmentsByPatientName(name);
    }

    // create new appointment
    @PostMapping
    public Appointment createAppointment(@RequestBody Appointment appointment) {
        return appointmentService.createAppointment(appointment);
    }

    // update appointment
    @PutMapping("/{id}")
    public Appointment updateAppointment(@PathVariable Long id, @RequestBody Appointment appointment) {
        return appointmentService.updateAppointment(id, appointment);
    }

    // update registration fee status
    @PatchMapping("/registration-fee/{id}")
    public Appointment updateRegistrationFee(@PathVariable Long id, @RequestBody Appointment appointment) {
        return appointmentService.updateRegistrationFee(id, appointment);
    }

    // delete appointment
    @DeleteMapping("/{id}")
    public boolean deleteAppointment(@PathVariable Long id) {
        return appointmentService.deleteAppointment(id);
    }
}
