package com.tharishaperera.utils;

import org.mindrot.jbcrypt.BCrypt;

public class SecurityConfig {
    // hash password
    public static String hashPassword(String plainPassword) {
        return BCrypt.hashpw(plainPassword, BCrypt.gensalt());
    }

    // check password validity
    public static boolean checkPassword(String plainPassword, String hashedPassword) {
        return BCrypt.checkpw(plainPassword, hashedPassword);
    }
}
