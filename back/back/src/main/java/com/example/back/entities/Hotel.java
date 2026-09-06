package com.example.back.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Hotels")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder

public class Hotel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private Double goodAverage;
    private Double price;
    private String route;
    private String mainImg;
    private List<String> othersImg;
    //Relacion con la tabla de caracteristicas
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "hotel_features",
      joinColumns = @JoinColumn(name = "hotel_id"),
      inverseJoinColumns = @JoinColumn(name = "feature_id"))
    @Builder.Default
    private List<Features> features = new ArrayList<>();

}
