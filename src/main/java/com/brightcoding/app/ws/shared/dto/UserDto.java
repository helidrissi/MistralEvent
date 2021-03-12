package com.brightcoding.app.ws.shared.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.io.Serializable;
import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserDto implements Serializable {
    
	/**
	 * 
	 */
	private static final long serialVersionUID = -2624881664878912922L;
	
	private long id;
	private String userId;
	private String firstName;
	private String lastName;
	private String email;
	private String password;


	
	
}
