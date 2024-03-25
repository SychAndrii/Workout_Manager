import { Response } from 'express';

/**
 * Extends the built-in Error class to handle HTTP-specific error details
 * and responses.
 */
class HttpError extends Error {
  /**
   * HTTP status code associated with the error.
   */
  private statusCode: number;

  /**
   * Creates an instance of HttpError.
   *
   * @param {string} message - The error message.
   * @param {number} statusCode - The HTTP status code associated with the error.
   */
  public constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }

  /**
   * Sends an HTTP response with the error's status code and message.
   *
   * @param {Response} response - The Express response object.
   */
  public sendResponse(response: Response): void {
    response.status(this.statusCode).json({ message: this.message });
  }
}

export default HttpError;
