package fr.mistral.services;

import fr.mistral.domain.Event;
import fr.mistral.domain.UserEntity;

import java.util.List;

/**
 * Created by hel on 06/03/2021.
 */
public interface EventService {

    List<Event> getAllEvents();

    List<Event> getEvents(boolean isAgenda, boolean withOld, UserEntity user);

    Event getEventById(Long id);

    Event createNewEvent(Event event);

    Event saveEvent(Long id, Event event);

    Event patchEvent(Long id, Event event);

    void deleteEventById(Long id);
}
