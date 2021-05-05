package fr.mistral.controllers.v1;

import fr.mistral.domain.Group;
import fr.mistral.domain.Location;
import fr.mistral.repositories.ImageRepository;
import fr.mistral.services.LocationService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by hel on 12/03/21.
 */
@RestController
@RequestMapping(LocationController.BASE_URL)
public class LocationController {

    public static final String BASE_URL = "/api/v1/locations";

    private final LocationService locationService;

    public LocationController(LocationService locationService) {
        this.locationService = locationService;
    }


    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<Location> getListOfLocations() {
        return locationService.getAllLocations();
    }

    @GetMapping({"/{id}"})
    @ResponseStatus(HttpStatus.OK)
    public Location getLocationById(@PathVariable Long id) {
        return locationService.getLocationById(id);
    }


    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Location createNewLocation(@RequestBody Location location) {
        return locationService.createNewLocation(location);
    }

    @PutMapping({"/{id}"})
    @ResponseStatus(HttpStatus.OK)
    public Location updateLocation(@PathVariable Long id, @RequestBody Location location) {
        return locationService.saveLocation(id, location);
    }

    @PatchMapping({"/{id}"})
    @ResponseStatus(HttpStatus.OK)
    public Location patchLocation(@PathVariable Long id, @RequestBody Location location) {
        return locationService.patchLocation(id, location);
    }

    @DeleteMapping({"/{id}"})
    @ResponseStatus(HttpStatus.OK)
    public void deleteLocation(@PathVariable Long id) {
        locationService.deleteLocationById(id);
    }
}
