package com.tharishaperera.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tharishaperera.models.LoginData;
import com.tharishaperera.services.AuthService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    // receptionist login
    @PostMapping("/login")
    public Object login(@RequestBody LoginData loginData) {
        return authService.login(loginData);
    }
}
