import { Response } from 'express';
import ErrorSenderStrategy from './ErrorSenderStrategy';

/**
 * An implementation of the ErrorSenderStrategy interface that defines a specific strategy
 * for sending error responses. This particular strategy sends a 500 Internal Server Error
 * status code along with the error message.
 */
class ErrorStrategy implements ErrorSenderStrategy {
  /**
   * Sends an error response to the client.
   *
   * This method implements the send function defined in the ErrorSenderStrategy interface.
   * It sends a response with a 500 Internal Server Error status and includes the error message
   * in the response body.
   *
   * @param {Response<any, Record<string, any>>} response - The Express response object.
   * @param {Error} error - The error object containing the error details.
   */
  send(response: Response<any, Record<string, any>>, error: Error): void {
    // Set the HTTP status to 500 and send the error message in the response body.
    response.status(500).json({ message: error.message });
  }
}

export default ErrorStrategy;
