package com.example.back.hotel.repository;

import com.example.back.hotel.entities.Features;
import org.springframework.data.repository.CrudRepository;

public interface FeatureRepository extends CrudRepository <Features,Long>{

    public Features findByIconKey(String iconKey);
}
