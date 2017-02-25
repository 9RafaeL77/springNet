package myGroup.exception;

/**
 * Created by Rafael on 25.11.2016.
 */
public class NullValueOfArgumentException extends RuntimeException {
    public NullValueOfArgumentException(String message, String args) {
        super(message + " " + args);
    }
}
