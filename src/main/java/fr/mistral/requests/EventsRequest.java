package fr.mistral.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * Created by hel on 27/02/2021.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class EventsRequest {

    private boolean withOld;

    @NotNull(message = "Ce champ ne doit etre null !")
    private String userId;


}
