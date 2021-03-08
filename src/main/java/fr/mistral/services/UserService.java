package fr.mistral.services;

import java.util.List;

import fr.mistral.entities.UserEntity;
import org.springframework.security.core.userdetails.UserDetailsService;

import fr.mistral.shared.dto.UserDto;

public interface UserService extends UserDetailsService  {
	
	UserDto createUser(UserDto user);
    
	UserDto getUser(String email);
	
	UserDto getUserByUserId(String userId);
	

	List<UserEntity> getUsers();

}
