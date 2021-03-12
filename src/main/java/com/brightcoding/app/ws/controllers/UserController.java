package com.brightcoding.app.ws.controllers;

import java.util.List;

import com.brightcoding.app.ws.entities.UserEntity;
import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.brightcoding.app.ws.exceptions.UserException;
import com.brightcoding.app.ws.requests.UserRequest;
import com.brightcoding.app.ws.responses.ErrorMessages;
import com.brightcoding.app.ws.responses.UserResponse;
import com.brightcoding.app.ws.services.UserService;
import com.brightcoding.app.ws.shared.dto.UserDto;

@CrossOrigin(origins="*")
@RestController
@RequestMapping("/users")
public class UserController {
	
	@Autowired
	UserService userService;
	
	@GetMapping(path="/{id}", produces={MediaType.APPLICATION_XML_VALUE, MediaType.APPLICATION_JSON_VALUE})
	public ResponseEntity<UserResponse> getUser(@PathVariable String id) {
		
		UserDto userDto = userService.getUserByUserId(id);
		
		UserResponse userResponse = new UserResponse();
		
		BeanUtils.copyProperties(userDto, userResponse);
		
		return new ResponseEntity<UserResponse>(userResponse, HttpStatus.OK);
	}
	
	
	@GetMapping(produces={MediaType.APPLICATION_XML_VALUE, MediaType.APPLICATION_JSON_VALUE})
	public List<UserEntity> getAllUsers() {

		List<UserEntity> userEntities = userService.getUsers();

         return userEntities;
	}
	
	
	
	@PostMapping(
			    consumes={MediaType.APPLICATION_XML_VALUE, MediaType.APPLICATION_JSON_VALUE}, 
			    produces={MediaType.APPLICATION_XML_VALUE, MediaType.APPLICATION_JSON_VALUE}
			    )
	public ResponseEntity<UserResponse> createUser(@RequestBody  UserRequest userRequest) throws Exception {
		
		if(userRequest.getFirstName().isEmpty()) throw new UserException(ErrorMessages.MISSING_REQUIRED_FIELD.getErrorMessage());
		
		//UserDto userDto = new UserDto();
		//BeanUtils.copyProperties(userRequest, userDto);
		ModelMapper modelMapper = new ModelMapper();
		UserDto userDto = modelMapper.map(userRequest, UserDto.class);

		UserDto createUser = userService.createUser(userDto);
		
		UserResponse userResponse =  modelMapper.map(createUser, UserResponse.class);
		
		return new ResponseEntity<UserResponse>(userResponse, HttpStatus.CREATED);
		
		
	}
	

}
