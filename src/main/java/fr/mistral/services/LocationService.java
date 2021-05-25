package fr.mistral.services;

import fr.mistral.domain.Event;
import fr.mistral.domain.ImageModel;
import fr.mistral.domain.Location;

import java.util.List;
import java.util.Set;

/**
 * Created by hel on 06/03/2021.
 */

public interface LocationService {

    List<Location> getAllLocations();

    Location getLocationById(Long id);

    Location createNewLocation(Location location);

    Location saveLocation(Long id, Location location);

    Location patchLocation(Long id, Location location);

    void postLocationImage(Long id, ImageModel image);

    void deleteLocationById(Long id);
}
