package myGroup.exception;

/**
 * Created by Rafael on 25.11.2016.
 */
public class NullValueOfArgumentException extends Exception {
    private String message;
    private String args;

    public NullValueOfArgumentException(String mess, String args){
        message = mess;
        this.args = args;
    }

    @Override
    public String getMessage() {
        return message + " " + args;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getArgs() {
        return args;
    }

    public void setArgs(String args) {
        this.args = args;
    }
}
