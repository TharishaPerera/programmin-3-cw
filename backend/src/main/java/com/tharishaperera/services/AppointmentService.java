package com.tharishaperera.services;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.tharishaperera.models.Appointment;
import com.tharishaperera.utils.utils;

@Service
public class AppointmentService {
    public List<Appointment> appointmentList = new ArrayList<Appointment>();

    // get all appointments
    public List<Appointment> getAllAppointments() {
        return appointmentList;
    }

    // get appointment by id
    public Appointment getAppointmentById(Long id) {
        for (Appointment appointment: appointmentList) {
            if (appointment.getAppointmentId().equals(id)) {
                return appointment;
            }
        }
        return null;
    }

    // get appointments by date
    public List<Appointment> getAppointmentsByDate(LocalDate date) {
        return appointmentList.stream().filter(appointment -> appointment.getAppointmentDate().equals(date)).collect(Collectors.toList());
    }

    // create new appointment
    public Appointment createAppointment(Appointment appointment) {
        appointment.setAppointmentId(utils.generateId());
        appointmentList.add(appointment);
        return appointment;
    }

    // update appointment
    public Appointment updateAppointment(Long id, Appointment appointment) {
        Appointment existingAppointment = getAppointmentById(id);
        if (existingAppointment != null) {
            existingAppointment.setAppointmentDate(appointment.getAppointmentDate());
            existingAppointment.setAppointmentTime(appointment.getAppointmentTime());
            existingAppointment.setPatient(appointment.getPatient());
            existingAppointment.setStatus(appointment.getStatus());
        }
        return existingAppointment;
    }

    // delete appointment
    public boolean deleteAppointment(Long id) {
        boolean deleteStatus = appointmentList.removeIf(appointment -> appointment.getAppointmentId().equals(id));
        return deleteStatus; 
    }
}
