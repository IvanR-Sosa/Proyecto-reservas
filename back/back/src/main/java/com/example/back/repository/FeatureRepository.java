package com.example.back.repository;

import com.example.back.entities.Features;
import org.springframework.data.repository.CrudRepository;

public interface FeatureRepository extends CrudRepository <Features,Long>{

    public Features findByIconKey(String iconKey);
}
