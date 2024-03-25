// src/auth/basic-auth.js

// Configure HTTP Basic Auth strategy for Passport, see:
// https://github.com/http-auth/http-auth-passport

const auth = require('http-auth');
const authPassport = require('http-auth-passport');
const path = require('path');
const filePath = path.join(__dirname, '.htpasswd');
import authorize from './auth-middleware';

export function strategy() {
  // For our Passport authentication strategy, we'll look for a
  // username/password pair in the Authorization header.
  return authPassport(
    auth.basic({
      file: filePath,
    })
  );
}

export function authenticate() {
    return authorize('http');
}
