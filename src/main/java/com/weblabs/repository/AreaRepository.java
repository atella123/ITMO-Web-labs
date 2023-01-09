package com.weblabs.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.weblabs.model.AreaCheckResponse;

@Repository
public interface AreaRepository extends JpaRepository<AreaCheckResponse, Long> {

}
