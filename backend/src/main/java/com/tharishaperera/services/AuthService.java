package com.tharishaperera.services;

import org.springframework.stereotype.Service;

import com.tharishaperera.models.Dentist;
import com.tharishaperera.models.LoginData;
import com.tharishaperera.models.Receptionist;
import com.tharishaperera.utils.SecurityConfig;

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

        return null;
    }
}
