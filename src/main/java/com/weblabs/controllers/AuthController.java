package com.weblabs.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.weblabs.model.User;
import com.weblabs.services.AuthService;

@RestController
@RequestMapping(path = "api/auth")
public class AuthController {

	@Autowired
	private AuthService authService;

	@GetMapping(path = "/login")
	public boolean login(@RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader) {
		return authService.authenticateUser(authService.parseAuthHeader(authHeader)).isAuthenticated();
	}

	@PostMapping(path = "/register")
	public ResponseEntity<Object> register(@RequestBody User user) {
		if (!authService.registerUser(user)) {
			return new ResponseEntity<>(HttpStatus.CONFLICT);
		}
		return new ResponseEntity<>(HttpStatus.CREATED);
	}

}
