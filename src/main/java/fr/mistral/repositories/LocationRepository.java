package fr.mistral.repositories;

import fr.mistral.entities.Location;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by hel on 06/03/2021.
 */
@Repository
public interface LocationRepository extends CrudRepository<Location, Long> {
}
