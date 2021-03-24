package fr.mistral.bootstrap;

import fr.mistral.domain.Event;
import fr.mistral.domain.Location;
import fr.mistral.repositories.EventRepository;
import fr.mistral.repositories.LocationRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.sql.Date;


@Component
public class Bootstrap implements CommandLineRunner {


    private final EventRepository eventRepository;
    private final LocationRepository locationRepository;

    public Bootstrap(EventRepository eventRepository, LocationRepository locationRepository) {
        this.eventRepository = eventRepository;
        this.locationRepository = locationRepository;
    }


    @Override
    public void run(String... args) throws Exception {
        loadEvent();
    }

    private void loadEvent() {


        Date date =new Date(System.currentTimeMillis());
        Location location = new Location();

        location.setAdress("NDSM");
        location.setName("Awakenings");




        Event fest=new Event();
        fest.setDate(date);
        fest.setType("Festival");
        fest.setName("Awakenings");
        fest.setLocation(location);

        locationRepository.save(location);
        eventRepository.save(fest);

        System.out.println("Event Loaded: " + eventRepository.count());
    }
}
