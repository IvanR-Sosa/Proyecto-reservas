package com.example.back.service;

import com.example.back.entities.Category;

import java.util.List;

public interface ICategoryService {

    List<Category> getAllCategories();
    Category getCategoryById(Long id);
    Category getCategoryByTitle(String title);
    void saveCategory(Category category);
    void deleteCategory(Long id);
}
