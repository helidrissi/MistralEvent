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

        Group group1 = new Group();
        group1.setName("Mistral");
        groupRepository.save(group1);

        Group group2 = new Group();
        group2.setName("Développeurs");
        groupRepository.save(group2);

        Group group3 = new Group();
        group3.setName("Non devs");
        groupRepository.save(group3);

        User user = new User();
        user.setFirstName("Anthony");
        user.setLastName("Pfeifer");
        user.setEmail("anthony.pfeifer@mistral.fr");
        user.setPassword(bCryptPasswordEncoder.encode("Cookies"));
        user.setUserId(util.generateStringId(32));
        user.getGroups().add(group1);
        user.getGroups().add(group2);
        userRepository.save(user);

        User user2 = new User();
        user2.setFirstName("Orianne");
        user2.setLastName("Ferré");
        user2.setEmail("orianne.ferre@mistral.fr");
        user2.setPassword(bCryptPasswordEncoder.encode("Cookies"));
        user2.setUserId(util.generateStringId(32));
        user2.getGroups().add(group1);
        user2.getGroups().add(group2);
        userRepository.save(user2);

        LocalDateTime datetime = LocalDateTime.now();
        Location location = new Location();
        location.setAdress("40 Boulevard Charles de Gaulle");
        location.setName("L'Univers");
        location.setPhone("04 73 93 19 84");
        location.setCity("Clermont-Ferrand");

        Event fest=new Event();
        fest.setDate(datetime);
        fest.setType("Restaurant");
        fest.setName("Resto du midi");
        fest.setLocation(location);
        fest.getGroups().add(group1);
        fest.setAuthor(user);
        fest.getUsers().add(user);
        locationRepository.save(location);
        eventRepository.save(fest);

        datetime = LocalDateTime.now();
        location = new Location();
        location.setAdress("38 Rue Georges Clemenceau");
        location.setName("Le Numéro 3");
        location.setPhone("04 73 93 22 61");
        location.setCity("Clermont-Ferrand");

        fest=new Event();
        fest.setDate(datetime);
        fest.setType("Restaurant");
        fest.setName("Resto du jeudi midi");
        fest.setLocation(location);
        fest.getGroups().add(group1);
        fest.setAuthor(user2);
        locationRepository.save(location);
        eventRepository.save(fest);

        datetime = LocalDateTime.now();
        location = new Location();
        location.setAdress("5 Place Gilbert Gaillard");
        location.setName("Hacienda Cafe");
        location.setCity("Clermont-Ferrand");

        fest=new Event();
        fest.setDate(datetime);
        fest.setType("Bar");
        fest.setName("Afterwork");
        fest.setLocation(location);
        fest.getGroups().add(group2);
        fest.setAuthor(user);
        locationRepository.save(location);
        eventRepository.save(fest);

        datetime = LocalDateTime.now();
        location = new Location();
        location.setAdress("1 Rue Eugène Gilbert");
        location.setName("L'Odevie");
        location.setCity("Clermont-Ferrand");

        fest=new Event();
        fest.setDate(datetime);
        fest.setType("Restaurant");
        fest.setName("Déjeuner de travail");
        fest.setLocation(location);
        fest.getGroups().add(group3);
        fest.setAuthor(user);
        locationRepository.save(location);
        eventRepository.save(fest);

        log.debug("Event Loaded: " + eventRepository.count());
    }
}
