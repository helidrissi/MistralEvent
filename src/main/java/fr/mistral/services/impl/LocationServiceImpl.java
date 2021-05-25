package fr.mistral.services.impl;

import fr.mistral.domain.ImageModel;
import fr.mistral.domain.Location;
import fr.mistral.repositories.ImageRepository;
import fr.mistral.repositories.LocationRepository;
import fr.mistral.services.LocationService;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

/**
 * Created by hel on 12/03/2021.
 */
@Service
public class LocationServiceImpl implements LocationService {

    private final LocationRepository locationRepository;

    public LocationServiceImpl(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }

    @Override
    public List<Location> getAllLocations() {
        return locationRepository.findAll()
                .stream()
                .collect(Collectors.toList());
    }

    @Override
    public Location getLocationById(Long id) {
        return locationRepository.findById(id)
                .orElseThrow(ResourceNotFoundException::new);
    }

    @Override
    public Location createNewLocation(Location location) {
        return saveAndReturn(location);
    }

    private Location saveAndReturn(Location location) {
        Location savedLocation = locationRepository.save(location);

        return savedLocation;
    }

    @Override
    public Location saveLocation(Long id, Location location) {
        location.setId(id);

        return saveAndReturn(location);
    }

    @Override
    public Location patchLocation(Long id, Location location) {
        return locationRepository.findById(id).map(loc -> {
            if (location.getName() != null) {
                loc.setName(location.getName());
            }

            if (location.getAdress() != null) {
                loc.setAdress(location.getAdress());
            }

            if (location.getCity() != null) {
                loc.setCity(location.getCity());
            }

            for (ImageModel image : location.getImages()) {
                image.setLocation(loc);
            }

            loc.setImages(location.getImages());

            Location locationUpdated = locationRepository.save(loc);

            return locationUpdated;
        }).orElseThrow(ResourceNotFoundException::new);
    }

    @Override
    public void postLocationImage(Long id, ImageModel image) {
        Location location = locationRepository.findById(id).orElseThrow(ResourceNotFoundException::new);

        if (location != null) {
            image.setLocation(location);
            location.getImages().add(image);
            locationRepository.save(location);
        }
    }

    @Override
    public void deleteLocationById(Long id) {
        locationRepository.deleteById(id);
    }
}
