package fr.mistral.services;

import fr.mistral.domain.Event;
import fr.mistral.repositories.EventRepository;
import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

public class EventServiceImplTest {

    @Mock
    EventRepository eventRepository;


    EventService eventService;

    @Before("")
    public void setUp() throws Exception {
        MockitoAnnotations.initMocks(this);


    }

  /*  @Test
    public void getAllEvents() throws Exception {
        //given
        Event lunch = new Event();
        lunch.setId(1l);
        lunch.setName("Friday lunch");
        long millis = System.currentTimeMillis();
        java.sql.Date uDate = new java.sql.Date(millis);
        lunch.setDate(uDate);

        Event rave = new Event();
        rave.setId(1l);
        rave.setName("Rave Party");
        long millis1 = System.currentTimeMillis();
        java.sql.Date uDate1 = new java.sql.Date(millis1);
        rave.setDate(uDate1);

        when(eventRepository.findAll()).thenReturn(Arrays.asList(lunch, rave));

        //when
        List<Event> events = eventService.getAllEvents();

        //then
        assertEquals(2, events.size());

    }*/

    /*@Test
    public void getCustomerById() throws Exception {
        //given
        Customer customer1 = new Customer();
        customer1.setId(1l);
        customer1.setFirstname("Michale");
        customer1.setLastname("Weston");

        when(customerRepository.findById(anyLong())).thenReturn(java.util.Optional.ofNullable(customer1));

        //when
        CustomerDTO customerDTO = customerService.getCustomerById(1L);

        assertEquals("Michale", customerDTO.getFirstname());
    }

    @Test
    public void createNewCustomer() throws Exception {

        //given
        CustomerDTO customerDTO = new CustomerDTO();
        customerDTO.setFirstname("Jim");

        Customer savedCustomer = new Customer();
        savedCustomer.setFirstname(customerDTO.getFirstname());
        savedCustomer.setLastname(customerDTO.getLastname());
        savedCustomer.setId(1l);

        when(customerRepository.save(any(Customer.class))).thenReturn(savedCustomer);

        //when
        CustomerDTO savedDto = customerService.createNewCustomer(customerDTO);

        //then
        assertEquals(customerDTO.getFirstname(), savedDto.getFirstname());
        assertEquals("/api/v1/customers/1", savedDto.getCustomerUrl());
    }

    @Test
    public void saveCustomerByDTO() throws Exception {

        //given
        CustomerDTO customerDTO = new CustomerDTO();
        customerDTO.setFirstname("Jim");

        Customer savedCustomer = new Customer();
        savedCustomer.setFirstname(customerDTO.getFirstname());
        savedCustomer.setLastname(customerDTO.getLastname());
        savedCustomer.setId(1l);

        when(customerRepository.save(any(Customer.class))).thenReturn(savedCustomer);

        //when
        CustomerDTO savedDto = customerService.saveCustomerByDTO(1L, customerDTO);

        //then
        assertEquals(customerDTO.getFirstname(), savedDto.getFirstname());
        assertEquals("/api/v1/customers/1", savedDto.getCustomerUrl());
    }
*/
/*    @Test
    public void deleteEventById() throws Exception {

        Long id = 1L;

        eventRepository.deleteById(id);

        verify(eventRepository, times(1)).deleteById(anyLong());
    }*/
}
