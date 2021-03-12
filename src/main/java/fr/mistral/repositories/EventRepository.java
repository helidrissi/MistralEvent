package fr.mistral.repositories;

import fr.mistral.domain.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by hel on 06/03/2021.
 */
@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
}
