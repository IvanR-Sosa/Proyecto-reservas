package com.example.back.service;

import com.example.back.entities.Features;
import com.example.back.persistence.IFeaturesDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class FeaturesServiceImpl implements IFeaturesService {
    @Autowired
    private IFeaturesDAO iFeaturesDAO;


    @Override
    public List<Features> getAllFeatures() {
        return iFeaturesDAO.findAll();
    }

    @Override
    public Features findByName(String name) {
        return iFeaturesDAO.findByName(name);
    }

    @Override
    public Optional<Features> findById(Long id) {
        return iFeaturesDAO.findById(id);
    }

    @Override
    public void saveFeatures(String name) {
        if(name!=null && !name.trim().isEmpty()){
            String cleanName = name.trim();
            Features features = iFeaturesDAO.findByName(cleanName);
            if(features==null){
                Features newfeatures = new Features();
                newfeatures.setIconKey(cleanName);
                iFeaturesDAO.save(newfeatures);
            }
        }
    }

    @Override
    public void deleteFeatures(Long id) {
        iFeaturesDAO.deleteById(id);
    }
}
