package com.example.back.hotel.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "categories")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String tittle;
    private String description;
    private String imgUrl;

}
