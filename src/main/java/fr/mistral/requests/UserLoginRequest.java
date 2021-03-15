package fr.mistral.requests;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * Created by hel on 27/02/2021.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserLoginRequest {

    private String email;

    private String password;


}
