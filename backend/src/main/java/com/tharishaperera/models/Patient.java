package com.tharishaperera.models;

import java.time.LocalDate;

import com.tharishaperera.config.enums.UserType;


public class Patient extends User {
    private String address;
    private LocalDate dob;
    
    public Patient(Long userId, String firstName, String lastName, String email, Long mobile, UserType userType,
            String address, LocalDate dob) {
        super(userId, firstName, lastName, email, mobile, userType);
        this.address = address;
        this.dob = dob;
    }
    public String getAddress() {
        return address;
    }
    public void setAddress(String address) {
        this.address = address;
    }
    public LocalDate getDob() {
        return dob;
    }
    public void setDob(LocalDate dob) {
        this.dob = dob;
    }
}
