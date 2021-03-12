package com.brightcoding.app.ws.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserResponse {

	private String userId;
	private String firstName;
	private String lastName;
	private String email;



}
