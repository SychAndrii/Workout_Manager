import Express from "express";

import getAllMuscle from "./get/getAllMuscle";


// eslint-disable-next-line
const router = Express.Router();

/**
 * Retrieves all Muscles.
 * If you want to refer to available values of equipment, muscles, or exercise types,
 * see /src/Exercise/array.ts
 *
 * Path:
 *    /api/muscle/
 * Method:
 *    GET
 * Responses:
 *    200 - successfully retrieved all muscle.
 *        Example response:
 *        [
 *          muscle1: string,
 *         muscle2: string
 *        ]
      401 - user unauthenticated.
      500 - unknown server error.
 */
router.get("/", getAllMuscle);


export default router;
