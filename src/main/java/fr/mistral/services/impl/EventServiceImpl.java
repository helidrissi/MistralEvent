package fr.mistral.services.impl;

import fr.mistral.domain.Event;
import fr.mistral.domain.Group;
import fr.mistral.domain.UserEntity;
import fr.mistral.repositories.EventRepository;
import fr.mistral.services.EventService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
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
    public List<Event> getEvents(boolean isAgenda, boolean withOld, UserEntity user) {
        List<Event> list = eventRepository.findAll();
        ArrayList<Event> retour = new ArrayList<Event> ();

        LocalDateTime now = LocalDateTime.now();
        LocalDateTime dateRef = LocalDateTime.of(now.getYear(), now.getMonth(), now.getDayOfMonth(), 0, 0);

        for (Event event : list) {
            if (isAgenda) {
                if (withOld) {
                    if (event.getUsers().contains(user)) {
                        retour.add(event);
                    }
                } else {
                    if (event.getUsers().contains(user) && event.getDate().isAfter(dateRef)) {
                        retour.add(event);
                    }
                }
            } else {
                if (withOld) {
                    boolean test = false;
                    for (Group group : event.getGroups()) {
                        if (user.getGroups().contains(group)) {
                            test = true;
                            break;
                        }
                    }
                    if (test) {
                        retour.add(event);
                    }
                } else if (event.getDate().isAfter(dateRef)) {
                    boolean test = false;
                    for (Group group : event.getGroups()) {
                        if (user.getGroups().contains(group)) {
                            test = true;
                            break;
                        }
                    }
                    if (test) {
                        retour.add(event);
                    }
                }
            }
        }

        return retour.stream()
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
            if (event.getGroups() != null) {
                ev.setGroups(event.getGroups());
            }
            if (event.getAuthor() != null) {
                ev.setAuthor(event.getAuthor());
            }
            System.err.println("nb=" + (event.getUsers() != null ? event.getUsers().size() : "null"));
            if (event.getUsers() != null) {
                ev.setUsers(event.getUsers());
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
