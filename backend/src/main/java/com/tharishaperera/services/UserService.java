package com.tharishaperera.services;

import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;
import com.tharishaperera.models.User;
import com.tharishaperera.utils.Utils;

@Service
public class UserService {
    public List<User> userList = new ArrayList<User>();

    // get all users
    public List<User> getAllUsers() {
        return userList;
    }

    // create a user
    public User createUser(User user) {
        user.setUserId(Utils.generateId());
        userList.add(user);
        return user;
    }

    // get user by id
    public User getUserById(Long id) {
        for (User user: userList) {
            if (user.getUserId().equals(id)) {
                return user;
            }
        }
        return null;
    }

    // update user
    public User updateUser(Long id, User updatedUser) {
        User existingUser = getUserById(id);
        if (existingUser != null) {
            existingUser.setFirstName(updatedUser.getFirstName());
            existingUser.setLastName(updatedUser.getLastName());
            existingUser.setEmail(updatedUser.getEmail());
            existingUser.setMobile(updatedUser.getMobile());
            existingUser.setUserType(updatedUser.getUserType());
        }
        return existingUser;
    }

    // delete user
    public boolean deleteUser(Long id) {
        boolean deleteStatus = userList.removeIf(user -> user.getUserId().equals(id));
        return deleteStatus; 
    }
}
