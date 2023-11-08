package com.tharishaperera.services;

import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;

import com.tharishaperera.models.Dentist;
import com.tharishaperera.utils.CheckExistingEmail;
import com.tharishaperera.utils.SecurityConfig;
import com.tharishaperera.utils.Utils;

@Service
public class DentistService {
    public static List<Dentist> dentistList = new ArrayList<Dentist>();
    
    // get all dentists
    public List<Dentist> getAllDentists() {
        return dentistList;
    }

    // create a dentist
    public Dentist createDentist(Dentist dentist) {
        if (CheckExistingEmail.checkEmailExists(dentist.getEmail())) {
            return null;
        }
        dentist.setUserId(Utils.generateId());
        dentist.setPassword(SecurityConfig.hashPassword(dentist.getPassword()));
        dentistList.add(dentist);
        
        return dentist;
    }

    // get dentist by id
    public Dentist getDentistById(Long id) {
        for (Dentist dentist: dentistList) {
            if (dentist.getUserId().equals(id)) {
                return dentist;
            }
        }
        return null;
    }

    // update dentist
    public Dentist updateDentist(Long id, Dentist dentist) {
        Dentist existing = getDentistById(id);
        if (existing != null) {
            existing.setFirstName(dentist.getFirstName());
            existing.setLastName(dentist.getLastName());
            existing.setEmail(dentist.getEmail());
            existing.setMobile(dentist.getMobile());
            existing.setUserType(dentist.getUserType());
            existing.setQualification(dentist.getQualification());
            existing.setSpecialization(dentist.getSpecialization());
            existing.setPassword(SecurityConfig.hashPassword(dentist.getPassword()));
        }
        return existing;
    }

    // delete dentist
    public boolean deleteDentist(Long id) {
        boolean deleteStatus = dentistList.removeIf(dentist -> dentist.getUserId().equals(id));
        return deleteStatus; 
    }
}
