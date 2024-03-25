import {Response} from 'express';
import HttpError from '../../errors/classes/HttpError';
import HttpErrorStrategy from '../../errors/strategies/HttpErrorStrategy';
import ErrorStrategy from '../../errors/strategies/ErrorStrategy';

/**
 * Facilitates the sending of error responses to the client, utilizing different strategies
 * based on the error type. It specifically handles instances of HttpError using the
 * HttpErrorStrategy, and other Error instances using the ErrorStrategy.
 */
class ErrorSender {
  /**
   * Sends an error response based on the type of the provided error object. It distinguishes
   * between HttpError instances and generic Error instances to apply the appropriate
   * error handling strategy.
   *
   * @param {Response} response - The Express response object to send the error response to.
   * @param {Error} error - The error object that needs to be handled and sent as a response.
   * @throws {Error} Throws an error if an unknown error type is passed.
   */
  public sendError(response: Response, error: Error) {
    if (error instanceof HttpError) {
      new HttpErrorStrategy().send(response, error);
    } else if (error instanceof Error) {
      new ErrorStrategy().send(response, error);
    } else {
      throw new Error(`Unknown error type passed to the ErrorSender!. Received type: [${typeof error}]`);
    }
  }
}

export default new ErrorSender();
