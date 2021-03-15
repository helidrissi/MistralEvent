package fr.mistral.shared.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString

/**
 * Created by hel on 27/02/2021.
 */
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
