package com.example.back.hotel.controller;


import com.example.back.hotel.entities.Category;
import com.example.back.hotel.service.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "http://localhost:5173")
public class CategoryController {
    @Autowired
    private ICategoryService categoryService;

    @GetMapping("/all")
    public ResponseEntity<?> getAll() {
        try {
            List<Category> categoryList = categoryService.getAllCategories();
            return ResponseEntity.ok(categoryList);
        }catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }
    @GetMapping("/id/{id}")
    public ResponseEntity<?> getCategoryById(@PathVariable Long id) {
        try {
            Category category = categoryService.getCategoryById(id);
            return ResponseEntity.ok(category);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    @GetMapping("/name/{name}")
    public ResponseEntity<?> getCategoryByName(@PathVariable String name) {
        try {
            Category category = categoryService.getCategoryByTitle(name);
            return ResponseEntity.ok(category);
        }catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    @PostMapping("/save")
    public ResponseEntity<?> addCategory(@RequestBody Category category) {
        try{
            categoryService.saveCategory(category);
            return ResponseEntity.ok("Categoria guardada exitosamente");
        }catch (IllegalArgumentException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }catch (Exception e){
            return ResponseEntity.internalServerError().build();
        }
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateCategory(@PathVariable Long id,@RequestBody Category category) {
        try{
            category.setId(id);
            categoryService.saveCategory(category);
            return ResponseEntity.ok("Categoria actualizada exitosamente");
        }catch (IllegalArgumentException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }catch (Exception e){
            return ResponseEntity.internalServerError().build();
        }
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteCategoryById(@PathVariable Long id) {
        try {
            categoryService.deleteCategory(id);
            return ResponseEntity.ok("Categoria eliminada exitosamente");
        }catch (IllegalArgumentException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }catch (Exception e){
            return ResponseEntity.internalServerError().build();
        }
    }
}
