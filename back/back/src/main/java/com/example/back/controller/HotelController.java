package com.example.back.controller;

import com.example.back.entities.Hotel;
import com.example.back.service.HotelServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.nio.file.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/Hotel")
@CrossOrigin(origins = "http://localhost:5173")

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

    @PostMapping("/save")
    public ResponseEntity<?> save (@RequestBody HotelDTO hotelDTO){
        try {
           hotelService.save(hotelDTO);
            return ResponseEntity.created(URI.create("api/Hotel/save")).build();
        }catch (RuntimeException e){
            return  ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadImgs(@RequestParam("file") MultipartFile file){
        try {
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("El archivo está vacío");
            }

            // Generar un nombre único para evitar conflictos
            String originalName = file.getOriginalFilename();
            String uniqueName = UUID.randomUUID().toString() + "_" + originalName;

            // CORRECCIÓN: Apunta a la carpeta "uploads" en la raíz del proyecto
            Path uploadsPath = Paths.get("uploads");

            // Asegurar la existencia de la carpeta de manera segura
            Files.createDirectories(uploadsPath);

            // Guardar el archivo en el disco
            Path filePath = uploadsPath.resolve(uniqueName);
            Files.write(filePath, file.getBytes());

            // Retorna solo el nombre único del archivo guardado
            return ResponseEntity.ok(uniqueName);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al guardar el archivo: " + e.getMessage());
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update (@PathVariable Long id,@RequestBody HotelDTO hotelDTO){
        try {
            HotelDTO hotelDtoUpdate = hotelService.finByIdDTO(id);
            if (hotelDtoUpdate != null){
                hotelDTO.setId(id);
                hotelService.save(hotelDTO);
                return ResponseEntity.ok().build();
            }
            return ResponseEntity.notFound().build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        try {
            HotelDTO hotelDTO = hotelService.finByIdDTO(id);
            if (hotelDTO != null){
                hotelService.deleteById(id);
                return ResponseEntity.ok().build();
            }else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Hotel No Encontrado");
            }
        }catch (RuntimeException e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

}
