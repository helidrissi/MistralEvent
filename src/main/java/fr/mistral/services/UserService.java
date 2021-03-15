package fr.mistral.services;

import fr.mistral.domain.Event;
import fr.mistral.domain.UserEntity;
import fr.mistral.shared.dto.UserDto;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

/**
 * Created by hel on 06/03/2021.
 */
public interface UserService extends UserDetailsService {

    UserDto createUser(UserDto user);

    UserDto getUser(String email);

    UserEntity getUserByUserId(String userId);


    UserEntity patchUser(Long id, UserEntity user);

    List<UserEntity> getUsers();

}
