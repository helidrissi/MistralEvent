package fr.mistral.services.impl;

import fr.mistral.domain.Event;
import fr.mistral.repositories.EventRepository;
import fr.mistral.services.EventService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class EventServiceImpl implements EventService {


    private final EventRepository eventRepository;

    public EventServiceImpl(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }


    @Override
    public List<Event> getAllEvents() {
        return eventRepository.findAll()
                .stream()
                .collect(Collectors.toList());
    }

    @Override
    public Event getEventById(Long id) {
        return eventRepository.findById(id)
                .orElseThrow(ResourceNotFoundException::new);
    }

    @Override
    public Event createNewEvent(Event event) {
        return saveAndReturn(event);
    }

    private Event saveAndReturn(Event event) {
        Event savedEvent = eventRepository.save(event);


        return savedEvent;
    }

    @Override
    public Event saveEvent(Long id, Event event) {

        event.setId(id);

        return saveAndReturn(event);
    }

    @Override
    public Event patchEvent(Long id, Event event) {
        return eventRepository.findById(id).map(ev -> {

            if (event.getName() != null) {
                ev.setName(event.getName());
            }

            if (event.getType() != null) {
                ev.setType(event.getType());
            }
            if (event.getDate() != null) {
                ev.setDate(event.getDate());
            }
            Event eventUpdated = eventRepository.save(ev);


            return eventUpdated;

        }).orElseThrow(ResourceNotFoundException::new);
    }

    @Override
    public void deleteEventById(Long id) {
        eventRepository.deleteById(id);
    }
}
