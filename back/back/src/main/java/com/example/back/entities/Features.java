package com.example.back.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "features")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Features {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String iconKey;
    //Relacion con hotels
    @ManyToMany(mappedBy = "features")
    @Builder.Default
    private List<Hotel> hotels = new ArrayList<>();

}
