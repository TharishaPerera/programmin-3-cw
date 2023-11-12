package com.tharishaperera.services;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.tharishaperera.models.Dentist;
import com.tharishaperera.models.LoginData;
import com.tharishaperera.models.Receptionist;
import com.tharishaperera.utils.SecurityConfig;

class StatusObject {
    private int status;

    public StatusObject(int status) {
        this.status = status;
    }

    public int getStatus() {
        return status;
    }
}

@Service
public class AuthService {
    // login service
    public Object login(LoginData loginData) {
        // check in receptionist list
        for (Receptionist receptionist : ReceptionistService.receptionistsList) {
            if (receptionist.getEmail().equals(loginData.getEmail())
                    && SecurityConfig.checkPassword(loginData.getPassword(), receptionist.getPassword())) {
                return receptionist;
            }
        }

        // check in dentist list
        for (Dentist dentist : DentistService.dentistList) {
            if (dentist.getEmail().equals(loginData.getEmail())
                    && SecurityConfig.checkPassword(loginData.getPassword(), dentist.getPassword())) {
                return dentist;
            }
        }

        // StatusObject statusObject = new StatusObject(404);
        // return statusObject;
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Resource not found");
    }
}
