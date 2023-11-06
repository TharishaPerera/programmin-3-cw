package com.tharishaperera.models;

import com.tharishaperera.config.enums.UserType;

public class Receptionist extends User{
    private String password;

    public Receptionist(Long userId, String firstName, String lastName, String email, Long mobile, UserType userType,
            String password) {
        super(userId, firstName, lastName, email, mobile, userType);
        this.password = password;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
