package com.weblabs.services;

import java.time.Instant;
import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.weblabs.config.AreaConfig;
import com.weblabs.model.AreaCheckRequest;
import com.weblabs.model.AreaCheckResponse;
import com.weblabs.model.AreaFunction;
import com.weblabs.repository.AreaRepository;

@Service
public class AreaService {

    @Autowired
    private AreaRepository areaRepository;

    public AreaCheckResponse handleRequest(AreaCheckRequest request) {
        long startTimeNano = System.nanoTime();

        double x = request.getX();
        double y = request.getY();
        double r = request.getR();

        AreaCheckResponse response = new AreaCheckResponse(x, y, r,
                checkForHit(x, y, r, AreaConfig.getAreas()),
                System.nanoTime() - startTimeNano,
                Instant.now().toEpochMilli());

        areaRepository.save(response);
        return response;
    }

    public Collection<AreaCheckResponse> getAllAreas() {
        return areaRepository.findAll();
    }

    private boolean checkForHit(double x, double y, double r, Collection<AreaFunction> areas) {
        if (areas.isEmpty()) {
            throw new IllegalArgumentException("Area collection must not be empty");
        }

        return areas.stream().anyMatch(area -> area.inArea(x, y, r));
    }
}
