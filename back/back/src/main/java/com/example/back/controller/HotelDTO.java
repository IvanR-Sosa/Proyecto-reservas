package com.example.back.controller;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder

public class HotelDTO {
    private Long id;
    private String name;
    private String description;
    private Double goodAverage;
    private Double price;
    private String route;
    private String mainImg;
    private List<String> othersImg;
}
