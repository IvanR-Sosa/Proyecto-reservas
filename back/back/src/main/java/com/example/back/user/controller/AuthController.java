package com.example.back.user.controller;

import com.example.back.user.dto.AuthResponse;
import com.example.back.user.dto.LoginRequest;
import com.example.back.user.dto.RegisterRequest;
import com.example.back.user.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    //Endpoint de registro
    @PostMapping("/register")
    public ResponseEntity<?> resgiter(@RequestBody RegisterRequest registerRequest) {
        return ResponseEntity.ok(authService.register(registerRequest));

    }

    //Endpoint de login
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        // Dejamos el código limpio. Si las credenciales fallan,
        // saltará el 'BadCredentialsException' y el capturador enviará el JSON detallado.
        return ResponseEntity.ok(authService.login(request));
    }
}
