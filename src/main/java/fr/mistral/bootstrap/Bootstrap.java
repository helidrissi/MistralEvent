package fr.mistral.bootstrap;

import fr.mistral.domain.Event;
import fr.mistral.domain.Group;
import fr.mistral.domain.Location;
import fr.mistral.domain.User;
import fr.mistral.repositories.EventRepository;
import fr.mistral.repositories.GroupRepository;
import fr.mistral.repositories.LocationRepository;
import fr.mistral.repositories.UserRepository;
import fr.mistral.shared.Utils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.time.LocalDateTime;



@Slf4j
@RequiredArgsConstructor
@Component
@Transactional
@Profile("dev")
public class Bootstrap implements CommandLineRunner {




    private final PasswordEncoder bCryptPasswordEncoder;
    private final Utils util;
    private final EventRepository eventRepository;
    private final LocationRepository locationRepository;
    private final GroupRepository groupRepository;
    private final UserRepository userRepository;




    @Override
    public void run(String... args) throws Exception {
        loadEvent();
        util.formatDate();
    }

    private void loadEvent() {

        Group group = new Group();
        group.setName("Mistral");

        User user = new User();
        user.setFirstName("Anthony");
        user.setLastName("Pfeifer");
        user.setEmail("anthony.pfeifer@mistral.fr");
        user.setPassword(bCryptPasswordEncoder.encode("Cookies"));
        user.setUserId(util.generateStringId(32));
        user.getGroups().add(group);

        LocalDateTime datetime = LocalDateTime.now();
        Location location = new Location();
        location.setAdress("40 Boulevard Charles de Gaulle");
        location.setName("L'Univers");
        location.setCity("Clermont-Ferrand");

        Event fest=new Event();
        fest.setDate(datetime);
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

        log.debug("Event Loaded: " + eventRepository.count());
    }
}
