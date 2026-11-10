package com.example.back.hotel.repository;

import com.example.back.hotel.entities.Category;
import org.springframework.data.repository.CrudRepository;

public interface CategoryRepository extends CrudRepository<Category,Long> {

    public Category findBytittle(String tittle);

}
