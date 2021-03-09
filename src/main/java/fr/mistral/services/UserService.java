package fr.mistral.services;

import fr.mistral.entities.UserEntity;
import fr.mistral.shared.dto.UserDto;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

/**
 * Created by hel on 06/03/2021.
 */
public interface UserService extends UserDetailsService {

    UserDto createUser(UserDto user);

    UserDto getUser(String email);

    UserDto getUserByUserId(String userId);


    List<UserEntity> getUsers();

}
