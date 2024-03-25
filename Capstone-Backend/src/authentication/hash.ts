import crypto from 'crypto';

/**
 * @param {string} email user's email address
 * @return {string} string Hashed email address
 */
export default function(email: string) {
  return crypto.createHash('sha256').update(email).digest('hex');
}
