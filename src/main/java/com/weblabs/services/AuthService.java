package com.weblabs.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.Base64Utils;

import com.weblabs.model.User;
import com.weblabs.model.UserAuthentication;

@Service
public class AuthService {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User parseAuthHeader(String authentication) {
        String[] credentials = new String(Base64Utils.decodeFromString(authentication.split(" ")[1])).split(":");

        return new User(credentials[0], credentials[1]);
    }

    public UserAuthentication authenticateUser(User user) {
        try {
            UserDetails foundByUsername = userService.loadUserByUsername(user.getUsername());
            return new UserAuthentication(
                    user, passwordEncoder.matches(user.getPassword(), foundByUsername.getPassword()));
        } catch (UsernameNotFoundException e) {
            return new UserAuthentication(user, false);
        }
    }

    public boolean registerUser(User user) {
        try {
            userService.loadUserByUsername(user.getUsername());
            return false;
        } catch (UsernameNotFoundException e) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            userService.addUser(user);
        }
        return true;
    }

}
