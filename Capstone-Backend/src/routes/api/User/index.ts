import Express from 'express';
import addUser from './addUser';
import userExists from './userExists';
import getUser from './getUser';

// eslint-disable-next-line
const router = Express.Router();

// Route to add User
// Accepts in Request body:
// {
//   "email": string,
//   "data": {
//     "username": string,
//     "weight": number,
//     "age": number,
//     "height": number,
//     "gender": string
// }
// /api/user
router.post('/', addUser);

// Route to check if user exists
// Accepts in Query string:
// email: string
// Returns:
// 200 if user exists
// 404 if user does not exist
// /api/user/exists
router.get('/exists', userExists);

// Route to get user profile data by email
// Accepts in path:
// email: string
// Returns:
// 200 if user exists
// 404 if user does not exist
// Example:
// /api/user/email@example.com
router.get('/:email', getUser);

export default router;
