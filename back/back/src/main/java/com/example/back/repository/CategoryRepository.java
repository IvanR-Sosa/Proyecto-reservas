package com.example.back.repository;

import com.example.back.entities.Category;
import org.springframework.data.repository.CrudRepository;

public interface CategoryRepository extends CrudRepository<Category,Long> {

    public Category findBytittle(String tittle);

}
