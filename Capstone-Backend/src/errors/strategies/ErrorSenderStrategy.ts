import { Response } from 'express';

/**
 * Defines an interface for a strategy pattern to send error details in HTTP responses.
 * Implementations of this interface can provide various strategies to handle and
 * format error responses sent to clients.
 */
interface ErrorSenderStrategy {
  /**
   * Sends an error response to the client.
   * Implementations of this method should determine how the error is formatted and
   * sent back in the HTTP response, potentially based on the type or details of the error.
   *
   * @param {Response} response - The Express response object used to send the response.
   * @param {Error} error - The error that needs to be sent in the response.
   */
  send(response: Response, error: Error): void;
}

export default ErrorSenderStrategy;
