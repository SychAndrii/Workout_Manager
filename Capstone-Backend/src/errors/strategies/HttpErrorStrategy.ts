import { Response } from 'express';
import ErrorSenderStrategy from './ErrorSenderStrategy';
import HttpError from '../classes/HttpError';

/**
 * An implementation of the ErrorSenderStrategy interface that handles sending responses
 * for HttpError instances. This strategy delegates the response sending process to the
 * HttpError instance itself, allowing for a flexible and consistent error handling mechanism
 * that respects the specific details encapsulated in the HttpError.
 */
class HttpErrorStrategy implements ErrorSenderStrategy {
  /**
   * Sends an HTTP error response to the client based on the provided HttpError instance.
   *
   * This method implements the send function defined in the ErrorSenderStrategy interface.
   * It calls the sendResponse method of the HttpError, which is responsible for setting the
   * appropriate HTTP status code and sending the error message as a JSON response.
   *
   * @param {Response<any, Record<string, any>>} response - The Express response object.
   * @param {HttpError} error - The HttpError instance containing details about the HTTP error.
   */
  send(response: Response<any, Record<string, any>>, error: HttpError): void {
    // Delegate the response sending to the HttpError instance.
    error.sendResponse(response);
  }
}

export default HttpErrorStrategy;
