package com.tharishaperera.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.tharishaperera.models.Receptionist;
import com.tharishaperera.utils.SecurityConfig;
import com.tharishaperera.utils.utils;

@Service
public class ReceptionistService {
    public List<Receptionist> receptionistsList = new ArrayList<Receptionist>();
    
    // get all receptionists
    public List<Receptionist> getAllReceptionists() {
        return receptionistsList;
    }

    // create a receptionists
    public Receptionist createReceptionist(Receptionist receptionist) {
        receptionist.setUserId(utils.generateId());
        receptionist.setPassword(SecurityConfig.hashPassword(receptionist.getPassword()));
        receptionistsList.add(receptionist);
        return receptionist;
    }

    // get receptionists by id
    public Receptionist getReceptionistById(Long id) {
        for (Receptionist receptionist: receptionistsList) {
            if (receptionist.getUserId().equals(id)) {
                return receptionist;
            }
        }
        return null;
    }

    // update receptionists
    public Receptionist updateReceptionist(Long id, Receptionist receptionist) {
        Receptionist existing = getReceptionistById(id);
        if (existing != null) {
            existing.setFirstName(receptionist.getFirstName());
            existing.setLastName(receptionist.getLastName());
            existing.setEmail(receptionist.getEmail());
            existing.setMobile(receptionist.getMobile());
            existing.setUserType(receptionist.getUserType());
            existing.setPassword(SecurityConfig.hashPassword(receptionist.getPassword()));
        }
        return existing;
    }

    // delete receptionists
    public boolean deleteReceptionist(Long id) {
        boolean deleteStatus = receptionistsList.removeIf(receptionist -> receptionist.getUserId().equals(id));
        return deleteStatus; 
    }
}
