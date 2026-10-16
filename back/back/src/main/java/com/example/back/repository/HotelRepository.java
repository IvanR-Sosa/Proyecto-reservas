package com.example.back.repository;


import com.example.back.entities.Category;
import com.example.back.entities.Hotel;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface HotelRepository extends CrudRepository<Hotel,Long> {
    public List<Hotel> findByCategory(Category category);
    public List<Hotel> findByName(String name);
}
