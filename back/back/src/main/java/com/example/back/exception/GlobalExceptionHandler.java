package com.example.back.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    //Captura en errores de credenciales(Login fallido)
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<Map<String,String>> handleBadCredentials(BadCredentialsException ex){
        Map<String,String> error = new HashMap<>();
        error.put("error", "Credenciales invalidas");
        error.put("message", "El correo o la contraseña no coinciden");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
    }
    //Captura Errores personalizados que se lanzan con throw new RuntimeException
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String,String>> handleRuntimeException(RuntimeException ex){
        Map<String,String> error = new HashMap<>();
        error.put("error", "Error de aplicacion");
        error.put("message", ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }

    //Captura de otros errores
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String,String>> handleException(Exception ex){
        Map<String,String> error = new HashMap<>();
        error.put("error", "Error interno del servidor");
        error.put("Detail", ex.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }

}
