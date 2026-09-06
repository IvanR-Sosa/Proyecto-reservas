package com.example.back.persistence;

import com.example.back.entities.Features;

import java.util.List;
import java.util.Optional;

public interface IFeaturesDAO {
    List<Features> findAll();
    Optional<Features> findById(Long id);
    Features findByName(String name);
    Features save(Features features);
    void deleteById(Long id);

}
