package com.deepfake.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.deepfake.dto.AuthResponse;
import com.deepfake.dto.LoginRequest;
import com.deepfake.dto.RegisterRequest;
import com.deepfake.model.User;
import com.deepfake.security.JwtTokenProvider;
import com.deepfake.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*", maxAge = 3600)
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest registerRequest) {
        if (!registerRequest.getPassword().equals(registerRequest.getConfirmPassword())) {
            return ResponseEntity.badRequest().body("Passwords do not match");
        }

        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(registerRequest.getPassword());

        try {
            User savedUser = userService.registerUser(user);
            String token = jwtTokenProvider.generateTokenFromUsername(savedUser.getUsername());
            AuthResponse authResponse = new AuthResponse(token, "Bearer", savedUser.getId(), savedUser.getUsername(), savedUser.getEmail(), savedUser.getRole());
            return ResponseEntity.ok(authResponse);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtTokenProvider.generateToken(authentication);

        User user = userService.getUserByUsername(loginRequest.getUsername()).orElseThrow();
        AuthResponse authResponse = new AuthResponse(token, "Bearer", user.getId(), user.getUsername(), user.getEmail(), user.getRole());
        return ResponseEntity.ok(authResponse);
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(@RequestHeader("Authorization") String token) {
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
            if (jwtTokenProvider.validateToken(token)) {
                String username = jwtTokenProvider.getUsernameFromToken(token);
                User user = userService.getUserByUsername(username).orElseThrow();
                String newToken = jwtTokenProvider.generateTokenFromUsername(username);
                AuthResponse authResponse = new AuthResponse(newToken, "Bearer", user.getId(), user.getUsername(), user.getEmail(), user.getRole());
                return ResponseEntity.ok(authResponse);
            }
        }
        return ResponseEntity.badRequest().body("Invalid token");
    }
}