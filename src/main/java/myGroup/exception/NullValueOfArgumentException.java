package myGroup.exception;

/**
 * Created by Rafael on 25.11.2016.
 */
public class NullValueOfArgumentException extends Exception { //я бы рекомендовал использовать RuntimeException, чтобы НЕ писать в сигнатуре метода слово throws, например public String deleteFlightById(Integer id) throws NullValueOfArgumentException {, есть ряд моментов как различать checked и unchecked (наследники RuntimeException) но в большинстве случаев unchecked лучше
    private String message;
    private String args;

    public NullValueOfArgumentException(String mess, String args){
        // обычно делают super(message), например можете сделать super(message + " " + args), не вижу смысла отделно держать args
        // второй момент обычно предоставляют Exception(String message, Throwable cause) и Exception(Throwable cause) конструкторы - это для того чтобы можно было не потерять ошибку например для случаев
        // catch (Exception e) throw new NullValueOfArgumentException(e)
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
