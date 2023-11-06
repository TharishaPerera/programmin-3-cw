package com.tharishaperera.models;

import com.tharishaperera.config.enums.UserType;

public class Dentist extends User {
    private String specialization;
    private String qualification;
    private String password;
    
    public Dentist(Long userId, String firstName, String lastName, String email, Long mobile, UserType userType,
            String specialization, String qualification, String password) {
        super(userId, firstName, lastName, email, mobile, userType);
        this.specialization = specialization;
        this.qualification = qualification;
        this.password = password;
    }
    public String getSpecialization() {
        return specialization;
    }
    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }
    public String getQualification() {
        return qualification;
    }
    public void setQualification(String qualification) {
        this.qualification = qualification;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
}
