package com.example.back.hotel.service;

import com.example.back.hotel.controller.HotelDTO;
import com.example.back.hotel.entities.Hotel;

import java.util.List;
import java.util.Optional;

public interface IHotelService {
    List<Hotel>findAll();
    List<HotelDTO> findAllDTO();

    Optional<Hotel>findbyId(Long id);
    HotelDTO finByIdDTO(Long id);

    void save(HotelDTO hotelDTO);
    void deleteById(Long id);

    List<HotelDTO> topHotels();

}
