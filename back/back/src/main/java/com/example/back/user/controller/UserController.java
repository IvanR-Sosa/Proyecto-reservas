package com.example.back.user.controller;

import com.example.back.user.dto.UserResponse;
import com.example.back.user.entity.User;
import com.example.back.user.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("http://localhost:5173")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        return ResponseEntity.ok(userService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUserId(@PathVariable Long id) {
        return ResponseEntity.ok(userService.findById(id));
    }

    @GetMapping("/name/{username}")
    public ResponseEntity<UserResponse> getUserByUsername(@PathVariable String username) {
        return ResponseEntity.ok(userService.findByUsername(username));
    }
    @PutMapping("/{id}")
    public ResponseEntity<UserResponse> updateUser(@PathVariable Long id, @RequestBody User user) {
        return ResponseEntity.ok(userService.update(id, user));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/role")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserResponse> updateRole(@PathVariable Long id, @RequestBody String newRole) {
        String roleCleaned = newRole.replace("\"","").trim();
        UserResponse updatedUser = userService.updateRole(id, roleCleaned);
        return ResponseEntity.ok(updatedUser);
    }
    @PatchMapping("/{id}/password")
    public ResponseEntity<String> updatePassword(@PathVariable Long id, @RequestBody Map<String, String> request) {
        String newPassword = request.get("password");
        if(newPassword == null || newPassword.trim().isEmpty()){
            return ResponseEntity.badRequest().body("La contraseña no puede estar vacia");
        }
        userService.changePassword(id,newPassword);
        return ResponseEntity.ok("Contraseña actualizada correctamente");
    }
}
