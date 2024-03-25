import HttpError from './HttpError';

/**
 * Represents an error that should be thrown when an attempt is made to create a resource
 * that already exists. This class extends HttpError, setting the HTTP status code to 409
 * to indicate a conflict, as per standard HTTP status code definitions.
 */
class AlreadyExists extends HttpError {
  /**
   * Constructs an AlreadyExists error instance.
   *
   * @param {string} message - The error message that describes the conflict.
   */
  constructor(message: string) {
    // Calls the parent class constructor with the message and the HTTP status code 409
    super(message, 409);
  }
}

export default AlreadyExists;
