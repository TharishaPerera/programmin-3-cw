package com.tharishaperera.models;

import java.time.LocalDate;

import com.tharishaperera.config.enums.Status;
import com.tharishaperera.config.enums.UserType;


public class Patient extends User {
    private String address;
    private LocalDate dob;
    private Status regFeeStatus;
    
    public Patient(Long userId, String firstName, String lastName, String email, Long mobile, UserType userType,
            String address, LocalDate dob, Status regFeeStatus) {
        super(userId, firstName, lastName, email, mobile, userType);
        this.address = address;
        this.dob = dob;
        this.regFeeStatus = regFeeStatus;
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
    public Status getRegFeeStatus() {
        return regFeeStatus;
    }
    public void setRegFeeStatus(Status regFeeStatus) {
        this.regFeeStatus = regFeeStatus;
    }
}
