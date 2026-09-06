package com.example.back.controller;

import com.example.back.entities.Features;
import com.example.back.service.IFeaturesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(name = "/api/Feature")
@CrossOrigin(origins = "http://localhost:5173")
public class FeaturesController {
    @Autowired
    private IFeaturesService service;
    @GetMapping
    public ResponseEntity<?> getAllFeatures() {
        try {
            List<Features> list = service.getAllFeatures();
            return ResponseEntity.ok(list);
        }catch (RuntimeException e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }

    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getFeatureById(@PathVariable Long id) {
        try{
            Optional<Features> features = service.findById(id);
            return ResponseEntity.ok(features);
        }catch (RuntimeException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
    @GetMapping("/{name}")
    public ResponseEntity<?> getFeatureByName(@PathVariable String name) {
        try{
            Features features = service.findByName(name);
            return ResponseEntity.ok(features);
        }catch (RuntimeException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PostMapping("/save")
    public ResponseEntity<?> saveFeature(@RequestBody String name) {
        try {
            service.saveFeatures(name);
            return ResponseEntity.status(HttpStatus.CREATED).body(name);
        }catch (RuntimeException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping("/del/{id}")
    public ResponseEntity<?> deleteFeatureById(@PathVariable Long id) {
        try {
            Optional<Features> features = service.findById(id);
            if(features.isPresent()){
                service.deleteFeatures(id);
                return ResponseEntity.ok().build();
            }else{
                return ResponseEntity.notFound().build();
            }
        }catch (RuntimeException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
