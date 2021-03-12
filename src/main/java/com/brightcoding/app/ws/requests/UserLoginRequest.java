package com.brightcoding.app.ws.requests;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserLoginRequest {
	
	private String email;
	
	private String password;


	
	

}
