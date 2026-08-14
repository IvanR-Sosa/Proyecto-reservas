package com.example.back.repository;


import com.example.back.entities.Hotel;
import org.springframework.data.repository.CrudRepository;

public interface HotelRepository extends CrudRepository<Hotel,Long> {
}
