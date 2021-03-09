package fr.mistral.services;

import fr.mistral.entities.Event;

import java.util.List;

/**
 * Created by hel on 06/03/2021.
 */
public interface EventService {

    List<Event> getAllEvents();
}
