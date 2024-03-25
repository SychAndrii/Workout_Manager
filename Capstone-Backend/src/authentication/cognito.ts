// src/authorization/cognito.js
import dotenv from 'dotenv';
dotenv.config();
// Configure a JWT token strategy for Passport based on
// Identity Token provided by Cognito. The token will be
// parsed from the Authorization header (i.e., Bearer Token).

import {Strategy as BearerStrategy} from 'passport-http-bearer';
import {CognitoJwtVerifier} from 'aws-jwt-verify';
import logger from "../logger";
import authorize from './auth-middleware';

// Create a Cognito JWT Verifier, which will confirm that any JWT we
// get from a user is valid and something we can trust. See:
// https://github.com/awslabs/aws-jwt-verify#cognitojwtverifier-verify-parameters
const jwtVerifier = CognitoJwtVerifier.create({
  userPoolId: process.env.AWS_COGNITO_POOL_ID as string,
  clientId: process.env.AWS_COGNITO_CLIENT_ID as string,
  // We expect an Identity Token (vs. Access Token)
  tokenUse: 'id',
});

// At startup, download and cache the public keys (JWKS) we need in order to
// verify our Cognito JWTs, see https://auth0.com/docs/secure/tokens/json-web-tokens/json-web-key-sets
jwtVerifier
    .hydrate()
    .then(() => {
      console.log('Cognito JWKS cached');
    })
    .catch((err: Error) => {
      console.log(err);
    });

export function strategy() {
  // For our Passport authentication strategy, we'll look for the Bearer Token
  // in the Authorization header, then verify that with our Cognito JWT Verifier.
  return new BearerStrategy(async (token, done) => {
    try {
      // Verify this JWT
      const user = await jwtVerifier.verify(token);
      logger.debug({ user }, "verified user token");

      // Create a user, but only bother with their email
      done(null, user.email);
    } catch (err) {
      //   logger.error({
      //     file: __filename,
      //     msg: `could not verify token\nError: ${err}\nToken: ${token}`,
      //   });
      done(null, false);
    }
  });
}

export function authenticate() {
  return authorize('bearer');
}
