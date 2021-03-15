package fr.mistral.exceptions;

/**
 * Created by hel on 27/02/2021.
 */
public class UserException extends RuntimeException {


    private static final long serialVersionUID = 847500838613349753L;

    public UserException(String message) {
        super(message);
    }

}
