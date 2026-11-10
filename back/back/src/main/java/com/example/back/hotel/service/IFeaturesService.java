package com.example.back.hotel.service;

import com.example.back.hotel.entities.Features;

import java.util.List;
import java.util.Optional;

public interface IFeaturesService {

    List<Features> getAllFeatures();
    Features findByName(String name);
    Optional<Features> findById(Long id);
    void saveFeatures(String feature);
    void deleteFeatures(Long id);
}
