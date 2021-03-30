package fr.mistral.bootstrap;

import fr.mistral.domain.Event;
import fr.mistral.domain.Group;
import fr.mistral.domain.Location;
import fr.mistral.domain.UserEntity;
import fr.mistral.repositories.EventRepository;
import fr.mistral.repositories.GroupRepository;
import fr.mistral.repositories.LocationRepository;
import fr.mistral.repositories.UserRepository;
import fr.mistral.shared.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.sql.Date;


@Component
@Transactional
public class Bootstrap implements CommandLineRunner {

    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    Utils util;

    private final EventRepository eventRepository;
    private final LocationRepository locationRepository;
    private final GroupRepository groupRepository;
    private final UserRepository userRepository;

    public Bootstrap(EventRepository eventRepository, LocationRepository locationRepository, GroupRepository groupRepository, UserRepository userRepository) {
        this.eventRepository = eventRepository;
        this.locationRepository = locationRepository;
        this.groupRepository = groupRepository;
        this.userRepository = userRepository;
    }


    @Override
    public void run(String... args) throws Exception {
        loadEvent();
    }

    private void loadEvent() {

        Group group = new Group();
        group.setName("Mistral");

        UserEntity user = new UserEntity();
        user.setFirstName("Anthony");
        user.setLastName("Pfeifer");
        user.setEmail("anthony.pfeifer@mistral.fr");
        user.setPassword(bCryptPasswordEncoder.encode("Cookies"));
        user.setUserId(util.generateStringId(32));
        user.getGroups().add(group);

        Date date =new Date(System.currentTimeMillis());
        Location location = new Location();
        location.setAdress("40 Boulevard Charles de Gaulle");
        location.setName("L'Univers");
        location.setCity("Clermont-Ferrand");

        Event fest=new Event();
        fest.setDate(date);
        fest.setType("Restaurant");
        fest.setName("Resto du vendredi midi");
        fest.setLocation(location);
        fest.getGroups().add(group);
        fest.setAuthor(user);
        fest.getUsers().add(user);

        userRepository.save(user);
        groupRepository.save(group);
        locationRepository.save(location);
        eventRepository.save(fest);

        System.out.println("Event Loaded: " + eventRepository.count());
    }
}
