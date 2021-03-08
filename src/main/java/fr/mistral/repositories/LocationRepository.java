package fr.mistral.repositories;

import fr.mistral.entities.Location;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface LocationRepository extends CrudRepository<Location, Long> {
}
