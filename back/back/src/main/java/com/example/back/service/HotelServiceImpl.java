package com.example.back.service;

import com.example.back.controller.HotelDTO;
import com.example.back.entities.Hotel;
import com.example.back.persistence.IHotelDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class HotelServiceImpl implements IHotelService {
    @Autowired
    private IHotelDAO hotelDAO;
    @Override
    public List<Hotel> findAll() {
        return hotelDAO.findAll();
    }

    @Override
    public List<HotelDTO> findAllDTO() {
        return hotelDAO.findAll().stream()
                .map(h ->{
                   return mapToDto(h);
                })
                .toList();
    }

    @Override
    public Optional<Hotel> findbyId(Long id) {
        return hotelDAO.findById(id);
    }

    @Override
    public HotelDTO finByIdDTO(Long id) {
        Hotel hotel = hotelDAO.findById(id)
                .orElseThrow(()->new RuntimeException("Hotel No encontrado"));
        return mapToDto(hotel);
    }

    @Override
    public void save(HotelDTO hotelDTO) {
        Hotel hotel = mapToHotel(hotelDTO);
        hotelDAO.save(hotel);
    }

    @Override
    public void deleteById(Long id) {
        hotelDAO.deleteById(id);
    }

    @Override
    public List<HotelDTO> topHotels() {
        List<HotelDTO> topList = new ArrayList<>(findAllDTO());
        topList.sort(Comparator.comparing(HotelDTO::getGoodAverage,
                Comparator.nullsLast(Double::compare))
                .reversed());
        return topList.stream()
                .limit(5)
                .collect(Collectors.toList());
    }


    private HotelDTO mapToDto(Hotel hotel){

        String baseUrl ="http://localhost:8081/uploads/";
        String mainImgUrl =(hotel.getMainImg() != null) ? baseUrl + hotel.getMainImg() : null;

        List<String> othersImgUrl = new ArrayList<>();
        if (hotel.getOthersImg() != null) {
            for (String img : hotel.getOthersImg()) {
                othersImgUrl.add(baseUrl + img);
            }
        }
        return HotelDTO.builder()
                .id(hotel.getId())
                .name(hotel.getName())
                .description(hotel.getDescription())
                .goodAverage(hotel.getGoodAverage())
                .price(hotel.getPrice())
                .route(hotel.getRoute())
                .mainImg(mainImgUrl)
                .othersImg(othersImgUrl)
                .build();
    }
    private Hotel mapToHotel (HotelDTO hotelDTO){
        return Hotel.builder()
                .id(hotelDTO.getId())
                .name(hotelDTO.getName())
                .description(hotelDTO.getDescription())
                .goodAverage(hotelDTO.getGoodAverage())
                .price(hotelDTO.getPrice())
                .route(hotelDTO.getRoute())
                .mainImg(hotelDTO.getMainImg())
                .othersImg(hotelDTO.getOthersImg())
                .build();
    }
}
