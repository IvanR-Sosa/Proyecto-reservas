package com.example.back.hotel.service;

import com.example.back.hotel.entities.Category;
import com.example.back.hotel.entities.Hotel;
import com.example.back.hotel.repository.CategoryRepository;
import com.example.back.hotel.repository.HotelRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements ICategoryService {

    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private HotelRepository hotelRepository;


    @Override
    public List<Category> getAllCategories() {
        return (List<Category>) categoryRepository.findAll();
    }

    @Override
    public Category getCategoryById(Long id) {

        return categoryRepository.findById(id)
                .orElseThrow(()-> new IllegalArgumentException("Categoria No encontrada!"));
    }

    @Override
    public Category getCategoryByTitle(String title) {
        return categoryRepository.findBytittle(title);
    }

    @Override
    public void saveCategory(Category category) {


        Category category1 = getCategoryByTitle(category.getTittle());
        if(category1 != null && !category1.getId().equals(category.getId())){
          throw  new IllegalArgumentException("Categoria ya exixte");
        }
        categoryRepository.save(category);

    }

    @Override
    @Transactional
    public void deleteCategory(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(()-> new IllegalArgumentException("Categoria No encontrada!"));
        List<Hotel> hotels= hotelRepository.findByCategory(category);
        //Rompemos la relacion de la categoria para evitar daños a la estructura y por ende fallos en el proyecto
        for (Hotel hotel : hotels){
            hotel.setCategory(null);
        }
        hotelRepository.saveAll(hotels);//Guardar y actualizar

        categoryRepository.deleteById(id);

    }
}
