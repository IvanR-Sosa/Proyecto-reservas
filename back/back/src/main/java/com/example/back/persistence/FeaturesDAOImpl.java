package com.example.back.persistence;

import com.example.back.entities.Features;
import com.example.back.repository.FeatureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class FeaturesDAOImpl implements IFeaturesDAO{
    @Autowired
    private FeatureRepository featuresRepository;

    @Override
    public List<Features> findAll() {
        return (List<Features>) featuresRepository.findAll() ;
    }

    @Override
    public Optional<Features> findById(Long id) {
        return featuresRepository.findById(id);
    }

    @Override
    public Features findByName(String name) {
        return featuresRepository.findByIconKey(name);
    }

    @Override
    public Features save(Features features) {
        return featuresRepository.save(features);
    }


    @Override
    public void deleteById(Long id) {
        featuresRepository.deleteById(id);
    }
}
