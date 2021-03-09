package fr.mistral.responses;

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
public class UserResponse {

    private String userId;
    private String firstName;
    private String lastName;
    private String email;


}
