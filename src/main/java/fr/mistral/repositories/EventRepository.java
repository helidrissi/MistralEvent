package fr.mistral.repositories;

import fr.mistral.entities.Event;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by hel on 06/03/2021.
 */
@Repository
public interface EventRepository extends CrudRepository<Event, Long> {
}
