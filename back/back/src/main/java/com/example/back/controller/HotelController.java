package com.example.back.controller;

import com.example.back.entities.Hotel;
import com.example.back.service.HotelServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/Hotel")

public class HotelController  {
    @Autowired
    HotelServiceImpl hotelService;

    @GetMapping("")
    public ResponseEntity<?> findAll(){
        try {
            List<HotelDTO> hotelDTOList = hotelService.findAllDTO();
            return ResponseEntity.ok(hotelDTOList);
        }catch (RuntimeException e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById (@PathVariable Long id){
        try{
            HotelDTO hotelDTO = hotelService.finByIdDTO(id);
            return ResponseEntity.ok(hotelDTO);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/top")
    public ResponseEntity<?> findTop (){
        try{
            List<HotelDTO> topList = hotelService.topHotels();
            return ResponseEntity.ok(topList);
         } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PostMapping("save/{id}")
    public ResponseEntity<?> save (@RequestBody HotelDTO hotelDTO){
        try {
           hotelService.save(hotelDTO);
            return ResponseEntity.created(URI.create("api/Hotel/save")).build();
        }catch (RuntimeException e){
            return  ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @PostMapping("/update/{id}")
    public ResponseEntity<?> update (@PathVariable Long id,@RequestBody HotelDTO hotelDTO){
        try {
            HotelDTO hotelDtoUpdate = hotelService.finByIdDTO(id);
            if (hotelDtoUpdate != null){
                hotelService.save(hotelDtoUpdate);
                return ResponseEntity.ok().build();
            }
            return ResponseEntity.notFound().build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
