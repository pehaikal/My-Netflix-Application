package fr.epita.exceptions;

public class BadConfigurationException extends RuntimeException {

    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public BadConfigurationException(String message) {
        super(message);
    }
}
