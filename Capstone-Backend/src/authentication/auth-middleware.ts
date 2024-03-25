import passport from 'passport';
import hash from './hash';
// import logger from '../logger';
import {NextFunction} from 'express';
import {Response, Request} from 'express';

/**
 * Creates a middleware function for authentication using a specified passport strategy.
 * @param {'bearer' | 'http'} strategyName - The passport strategy to use.
 * @return {Function} - The middleware function to use for authentication.
 */
export default function(strategyName: 'bearer' | 'http') {
  return function(req: Request, res: Response, next: NextFunction) {
    /**
     * A custom callback to run after the user has been authenticated,
     * allowing for custom error handling and response modification.
     * @param {Error | null} err - An error object if authentication failed.
     * @param {string | false} email - An authenticated user's email address, or false if authentication failed.
     * @return {void} - Nothing is returned as this function handles the response directly.
     */
    function callback(err: Error | null, email: string | false) {
      // Something failed, let the error handling middleware deal with it

      if (err) {
        // logger.warn({
        //   file: __filename,
        //   msg: `error authenticating user
        // Error: ${err}`,
        // });
        return next({
          'status': '500',
          'error': {
            'code': 500,
            'message': 'Unable to authenticate user',
          },
        });
      }

      // Not authorized, return a 401
      if (!email) {
        return res.status(401).json({
          'status': '401',
          'error': {
            'code': 401,
            'message': 'Unauthorized',
          },
        });
      }

      // Authorized. Hash the user's email, attach to the request, and continue
      req.user = hash(email);
      //   logger.debug({ email, hash: req.user }, 'Authenticated user');

      // Call the next function in the middleware chain (e.g., your route handler)
      next();
    }

    // Call the given passport strategy's authenticate() method, passing the
    // req, res, next objects. Invoke our custom callback when done.
    passport.authenticate(strategyName, {session: false}, callback)(req, res, next);
  };
}
