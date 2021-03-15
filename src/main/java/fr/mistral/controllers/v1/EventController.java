package fr.mistral.controllers.v1;

import fr.mistral.domain.Event;
import fr.mistral.services.EventService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by hel on 12/03/21.
 */
@RestController
@RequestMapping(EventController.BASE_URL)
public class EventController {

    public static final String BASE_URL = "/api/v1/events";

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }


    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<Event> getListOfEvents() {
        return eventService.getAllEvents();
    }

    @GetMapping({"/{id}"})
    @ResponseStatus(HttpStatus.OK)
    public Event getEventById(@PathVariable Long id) {
        return eventService.getEventById(id);
    }


    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Event createNewEvent(@RequestBody Event event) {
        return eventService.createNewEvent(event);
    }

    @PutMapping({"/{id}"})
    @ResponseStatus(HttpStatus.OK)
    public Event updateEvent(@PathVariable Long id, @RequestBody Event event) {
        return eventService.saveEvent(id, event);
    }

    @PatchMapping({"/{id}"})
    @ResponseStatus(HttpStatus.OK)
    public Event patchEvent(@PathVariable Long id, @RequestBody Event event) {
        return eventService.patchEvent(id, event);
    }

    @DeleteMapping({"/{id}"})
    @ResponseStatus(HttpStatus.OK)
    public void deleteEvent(@PathVariable Long id) {
        eventService.deleteEventById(id);
    }
}
