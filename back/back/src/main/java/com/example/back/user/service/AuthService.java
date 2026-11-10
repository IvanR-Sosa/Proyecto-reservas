package com.example.back.user.service;

import com.example.back.config.security.JwtService;
import com.example.back.user.dto.AuthResponse;
import com.example.back.user.dto.LoginRequest;
import com.example.back.user.dto.RegisterRequest;
import com.example.back.user.entity.Role;
import com.example.back.user.entity.User;
import com.example.back.user.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    public AuthResponse register(RegisterRequest request) {
        //1.Validar que no se vaya a repetir el email
        if(userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email Ya existe en el sistema");
        }
        //2.Desempaquetamos los datos que trae el DTO
        User user = User.builder()
                .name(request.getName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
        //3.Guardar el usuario
        userRepository.save(user);
        AuthResponse authResponse = new AuthResponse();
        //4. Generar un token para hacer un logueo inmediato
        String token = jwtService.generateToken(user.getEmail());
        //5. Devolvemos la Respuesta con el authResponse
        return AuthResponse.builder()
                .token(token).name(user.getName())
                .lastName(user.getLastName()).email(user.getEmail()).role(user.getRole().name())
                .build();
    }

    public AuthResponse login(LoginRequest loginRequest) {
        //1.AuthenticationManager Compara la contraseña con el hash encriptado
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginRequest.getEmail(),
                loginRequest.getPassword()
        ));
        //2. si la validacion anterior es correcta pasamos a extraer los datos del usuario
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado tras autenticacion"));
        //3. Fabricamos el token para la sesion
        String token = jwtService.generateToken(user.getEmail());
        //4. Retornamos el token para que sea usado
        return AuthResponse.builder()
                .id(user.getId())
                .token(token)
                .name(user.getName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .role(user.getRole().name())
                .build();
    }
}
