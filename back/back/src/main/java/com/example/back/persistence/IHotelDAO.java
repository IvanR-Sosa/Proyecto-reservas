package com.example.back.persistence;

import com.example.back.entities.Hotel;

import java.util.List;
import java.util.Optional;


public interface IHotelDAO {
    List<Hotel> findAll();
    Optional<Hotel> findById(Long id);
    void save (Hotel hotel);
    void deleteById(Long id);
}
