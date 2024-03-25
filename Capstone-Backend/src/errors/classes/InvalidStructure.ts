import HttpError from './HttpError';

/**
 * Represents an error that should be thrown when a request contains data with an invalid
 * structure. This class extends HttpError, setting the HTTP status code to 400 to indicate
 * a bad request, as per standard HTTP status code definitions.
 */
class InvalidStructure extends HttpError {
  /**
   * Constructs an InvalidStructure error instance.
   *
   * @param {string} message - The error message that describes the invalid structure.
   */
  constructor(message: string) {
    // Calls the parent class constructor with the message and the HTTP status code 400
    super(message, 400);
  }
}

export default InvalidStructure;
