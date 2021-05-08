package fr.mistral.web.controllers.api;

import fr.mistral.repositories.*;
import fr.mistral.services.EventService;
import fr.mistral.services.GroupService;
import fr.mistral.services.LocationService;
import fr.mistral.services.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
public class EventRestControllerIT {


    @Autowired
    WebApplicationContext wac;

    public MockMvc mockMvc;

    @MockBean
    EventService eventService;

    @MockBean
    EventRepository eventRepository;

    @MockBean
    GroupService groupService;

    @MockBean
    GroupRepository groupRepository;

    @MockBean
    ImageRepository imageRepository;

    @MockBean
    LocationRepository locationRepository;

    @MockBean
    LocationService locationService;
    @MockBean
    UserRepository userRepository;

    @MockBean
    UserService userService;



    @BeforeEach
    public void setup() {
        mockMvc = MockMvcBuilders
                .webAppContextSetup(wac)
                .apply(springSecurity())
                .build();
    }



    /*@Test
    void deleteEventHttpBasic() throws Exception{
        mockMvc.perform(delete("/api/v1/events/1")
                .with(httpBasic("anthony.pfeifer@mistral.fr", "Cookies")))
                .andExpect(status().is2xxSuccessful());
    }

    @Test
    void deleteEventNoAuth() throws Exception{
        mockMvc.perform(delete("/api/v1/events/1"))
                .andExpect(status().isForbidden());
    }



    @Test
    void findEvents() throws Exception{
        mockMvc.perform(get("/api/v1/events/"))
                .andExpect(status().isOk());
    }

    @Test
    void findEventById() throws Exception{
        mockMvc.perform(get("/api/v1/events/1"))
                .andExpect(status().isOk());
    }*/

}
