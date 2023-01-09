package com.weblabs.controllers;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.weblabs.model.AreaCheckRequest;
import com.weblabs.model.AreaCheckResponse;
import com.weblabs.services.AreaService;

@RestController
@RequestMapping(path = "/api/area")
public class AreaController {

    @Autowired
    private AreaService areaService;

    @GetMapping
    public Collection<AreaCheckResponse> getAllAreas() {
        return areaService.getAllAreas();
    }

    @PostMapping(path = "checkPoint")
    public ResponseEntity<Object> checkArea(@RequestBody AreaCheckRequest request) {
        areaService.handleRequest(request);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

}
