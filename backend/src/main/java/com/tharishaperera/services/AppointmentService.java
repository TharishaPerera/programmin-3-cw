package com.tharishaperera.services;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.tharishaperera.models.Appointment;
import com.tharishaperera.utils.Utils;

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
        return appointmentList.stream().filter(appointment -> appointment.getAppointmentDate().equals(date))
                .collect(Collectors.toList());
    }

    // get appointments by patient name
    public List<Appointment> getAppointmentsByPatientName(String name) {
        List<Appointment> appointments = new ArrayList<Appointment>();
        for (Appointment appointment: appointmentList) {
            String patientName = appointment.getPatient().getFirstName() + " " + appointment.getPatient().getLastName();
            if (patientName.toLowerCase().contains(name.toLowerCase())) {
                appointments.add(appointment);
            }
        }
        if (appointments.isEmpty()) {
            return null;
        } else {
            return appointments;
        }
    }

    // create new appointment
    public Appointment createAppointment(Appointment appointment) {
        appointment.setAppointmentId(Utils.generateId());
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
            existingAppointment.setRegFeeStatus(appointment.getRegFeeStatus());
        }
        return existingAppointment;
    }

    // update registration fee status
    public Appointment updateRegistrationFee(Long id, Appointment appointment) {
        Appointment existingAppointment = getAppointmentById(id);
        if (existingAppointment != null) {
            existingAppointment.setRegFeeStatus(appointment.getRegFeeStatus());
        }
        return existingAppointment;
    }

    // delete appointment
    public boolean deleteAppointment(Long id) {
        boolean deleteStatus = appointmentList.removeIf(appointment -> appointment.getAppointmentId().equals(id));
        return deleteStatus;
    }
}
