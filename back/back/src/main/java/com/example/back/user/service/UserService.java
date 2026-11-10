package com.example.back.user.service;

import com.example.back.user.dto.UserResponse;
import com.example.back.user.entity.Role;
import com.example.back.user.entity.User;
import com.example.back.user.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional(readOnly = true)
    public List<UserResponse> findAll() {
        return userRepository.findAll()
                .stream()
                .map(UserResponse::new)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public UserResponse findById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Usuario no encontrado"));
        return new UserResponse(user);
    }

    @Transactional(readOnly = true)
    public UserResponse findByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(()->new RuntimeException("Usuario no encontrado"));
        return new UserResponse(user);
    }
    @Transactional(readOnly = true)
    public UserResponse findByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        return new UserResponse(user);
    }

    @Transactional
    public UserResponse update(Long id, User userU){
        User user = userRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Usuario no encontrado"));
        user.setName(userU.getName());
        user.setLastName(userU.getLastName());

        User userUpdated = userRepository.save(user);
        return  new UserResponse(userUpdated);
    }

    @Transactional
    public void delete(Long id) {
        userRepository.deleteById(id);
    }

    @Transactional
    public UserResponse updateRole(Long id, String newRole){
        User user = userRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Usuario no encontrado"));
        user.setRole(Role.valueOf(newRole.toUpperCase()));
        User userUpdated = userRepository.save(user);
        return UserResponse.builder()
                .id(user.getId())
                .name(userUpdated.getName())
                .lastName(userUpdated.getLastName())
                .email(userUpdated.getEmail())
                .role(String.valueOf(userUpdated.getRole()))
                .build();
    }

    @Transactional
    public void changePassword(Long id, String newPassword) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con ID: " + id));

        String encryptedPassword = passwordEncoder.encode(newPassword);
        user.setPassword(encryptedPassword);
        userRepository.saveAndFlush(user);

    }
}
