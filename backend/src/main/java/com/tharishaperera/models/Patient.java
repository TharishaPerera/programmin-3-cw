package com.tharishaperera.models;

import java.util.Date;

import com.tharishaperera.config.enums.UserType;

enum RegFeeStatus {
    PENDING,
    PAID
}

public class Patient extends User {
    private String address;
    private Date dob;
    private RegFeeStatus regFeeStatus;
    
    public Patient(Long userId, String firstName, String lastName, String email, Long mobile, UserType userType,
            String address, Date dob, RegFeeStatus regFeeStatus) {
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
    public Date getDob() {
        return dob;
    }
    public void setDob(Date dob) {
        this.dob = dob;
    }
    public RegFeeStatus getRegFeeStatus() {
        return regFeeStatus;
    }
    public void setRegFeeStatus(RegFeeStatus regFeeStatus) {
        this.regFeeStatus = regFeeStatus;
    }
}
