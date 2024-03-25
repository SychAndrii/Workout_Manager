import HttpError from './HttpError';

/**
 * Represents an error that should be thrown when a requested resource cannot be found.
 * This class extends HttpError, setting the HTTP status code to 404 to indicate that
 * the requested resource is not available or does not exist, as per standard HTTP
 * status code definitions.
 */
class NotFound extends HttpError {
  /**
   * Constructs a NotFound error instance.
   *
   * @param {string} message - The error message that describes the missing resource.
   */
  constructor(message: string) {
    // Calls the parent class constructor with the message and the HTTP status code 404
    super(message, 404);
  }
}

export default NotFound;
