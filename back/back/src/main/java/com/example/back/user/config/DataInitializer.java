package com.example.back.user.config;

import com.example.back.user.entity.Role;
import com.example.back.user.entity.User;
import com.example.back.user.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {

        if(userRepository.findByEmail("user1@test.com").isEmpty()) {
            User admin = User.builder()
                    .name("user1")
                    .lastName("One")
                    .email("user1@test.com")
                    .password(passwordEncoder.encode("1234"))
                    .role(Role.ADMIN)
                    .build();
            userRepository.save(admin);
            System.out.println(">> [DATA INITIALIZER] Created Admin User");
        }
        if (userRepository.findByEmail("user2@test.com").isEmpty()) {
            User regularUser = User.builder()
                    .name("user2")
                    .lastName("Two")
                    .email("user2@test.com")
                    .password(passwordEncoder.encode("1234"))
                    .role(Role.USER)
                    .build();
            userRepository.save(regularUser);
            System.out.println(">> [DataInitializer] Usuario USER de pruebas creado con éxito.");
        }

    }
}
