package com.example.back.hotel.repository;


import com.example.back.hotel.entities.Category;
import com.example.back.hotel.entities.Hotel;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface HotelRepository extends CrudRepository<Hotel,Long> {
    public List<Hotel> findByCategory(Category category);
    public List<Hotel> findByName(String name);
}
