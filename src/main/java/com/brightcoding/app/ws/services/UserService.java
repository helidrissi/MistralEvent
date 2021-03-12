package com.brightcoding.app.ws.services;

import java.util.List;

import com.brightcoding.app.ws.entities.UserEntity;
import org.springframework.security.core.userdetails.UserDetailsService;

import com.brightcoding.app.ws.shared.dto.UserDto;

public interface UserService extends UserDetailsService  {
	
	UserDto createUser(UserDto user);
    
	UserDto getUser(String email);
	
	UserDto getUserByUserId(String userId);
	

	List<UserEntity> getUsers();

}
