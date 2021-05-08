package fr.mistral.services;

import fr.mistral.domain.User;
import fr.mistral.shared.dto.UserDto;

import java.util.List;

/**
 * Created by hel on 06/03/2021.
 */
public interface UserService  {

    UserDto createUser(UserDto user);

    UserDto getUser(String email);

    User getUserByUserId(String userId);


    User patchUser(Long id, User user);

    List<User> getUsers();

}
