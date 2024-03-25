import Express from "express";
import addExercise from "./post/addExercise";
import getExerciseByName from "./get/getExerciseByName";
import getAllExercises from "./get/getAllExercises";
import multer from "multer";
import updateExerciseVideo from "./put/updateExerciseVideo";
import updateExerciseImage from "./put/updateExerciseImage";
import updateExerciseMetadata from "./put/updateExerciseMetadata";
import deleteExerciseByName from "./delete/deleteExerciseByName";

// Configure multer for file storage
const storage = multer.memoryStorage(); // Storing files in memory
const upload = multer({ storage: storage });

// eslint-disable-next-line
const router = Express.Router();

/**
 * Creates a new exercise inside of database.
 * If you want to refer to available values of equipment, muscles, or exercise types,
 * Or if you want to refer to available types of media,
 * see /src/Exercise/array.ts
 *
 * Path:
 *    /api/exercise/
 * Method:
 *    POST
 * Example Body (Sent with Form, not JSON):
 *    {
 *      name: string;
 *      primaryMuscles: strings separated by comma (no spacing);
 *      secondaryMuscles: strings separated by comma (no spacing);
 *      type: string;
 *      met: number;
 *      equipment: string;
 *      image: Buffer;
 *      video?: Buffer;
 *    }
 * Responses:
 *    200 - Successfully added the exercise data.
 *        Example response:
 *        {
 *          name: string;
 *          primaryMuscles: string[];
 *          secondaryMuscles: string[];
 *          type: string;
 *          met: number;
 *          equipment: string;
 *          imageURL: string;
 *          videoURL: string | null;
 *        }
 *    400 - Invalid structure for metadata or invalid mime type of media.
 *    401 - User is unauthenticated.
 *    500 - Unknown server error.
 * Example (submitted with form, not with JSON):
 *    {
 *      "name": "Bicep Curl",
 *      "primaryMuscles": "Biceps",
 *      "secondaryMuscles": "Forearms",
 *      "type": "Weighted_Reps",
 *      "met": 4.5,
 *      "equipment": "Dumbbell",
 *      "image": "BUFFER_DATA",
 *      "video": "BUFFER_DATA"
 *     }
 */
router.post(
  "/",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  addExercise
);

/**
 * Deletes a specific exercise by its name.
 *
 * Path:
 *    /api/exercise/:name
 * Method:
 *    DELETE
 * URL Params:
 *    name [String] - The name of the exercise to retrieve.
 * Responses:
 *    200 - Successfully deleted the exercise data.
 *    400 - Invalid structure for the 'name' parameter.
 *    401 - User is unauthenticated.
 *    404 - No exercise found matching the provided name.
 *    500 - Unknown server error.
 */
router.delete("/:name", deleteExerciseByName);

/**
 * Retrieves all exercises with their signed URLs.
 * If you want to refer to available values of equipment, muscles, or exercise types,
 * see /src/Exercise/array.ts
 *
 * Path:
 *    /api/exercise/
 * Method:
 *    GET
 * Responses:
 *    200 - successfully retrieved all exercises from the database.
 *        Example response:
 *        [
 *          {
              name: string;
              primaryMuscles: string[];
              secondaryMuscles: string[];
              type: string;
              met: number;
              equipment: string;
              imageURL: string;
              videoURL: string | null;
            }
 *        ]
      401 - user unauthenticated.
      500 - unknown server error.
 */
router.get("/", getAllExercises);

/**
 * Retrieves a specific exercise by its name with signed URLs for any associated media.
 * If you want to refer to available values of equipment, muscles, or exercise types,
 * see /src/Exercise/array.ts
 *
 * Path:
 *    /api/exercise/:name
 * Method:
 *    GET
 * URL Params:
 *    name [String] - The name of the exercise to retrieve.
 * Responses:
 *    200 - Successfully retrieved the exercise data.
 *        Example response:
 *        {
 *          name: string;
 *          primaryMuscles: string[];
 *          secondaryMuscles: string[];
 *          type: string;
 *          met: number;
 *          equipment: string;
 *          imageURL: string;
 *          videoURL: string | null;
 *        }
 *    400 - Invalid structure for the 'name' parameter.
 *    401 - User is unauthenticated.
 *    404 - No exercise found matching the provided name.
 *    500 - Unknown server error.
 */
router.get("/:name", getExerciseByName);

/**
 * Updates video of an exercise by name.
 * If you want to refer to available types of media,
 * see /src/Exercise/array.ts
 *
 * Path:
 *    /api/exercise/video/:name
 * URL Params:
 *    name [String] - The name of the exercise to retrieve.
 * Method:
 *    PUT
 * Example Body:
 *    Video blob
 * Responses:
 *    200 - Successfully updated the exercise data.
 *        Example response:
 *        {
 *          name: string;
 *          primaryMuscles: string[];
 *          secondaryMuscles: string[];
 *          type: string;
 *          met: number;
 *          equipment: string;
 *          imageURL: string;
 *          videoURL: string | null;
 *        }
 *    400 - Invalid mime type of media.
 *    401 - User is unauthenticated.
 *    404 - Exercise with this name is not found.
 *    500 - Unknown server error.
 */
router.put("/video/:name", updateExerciseVideo);

/**
 * Updates image of an exercise by name.
 * If you want to refer to available types of media,
 * see /src/Exercise/array.ts
 *
 * Path:
 *    /api/exercise/image/:name
 * URL Params:
 *    name [String] - The name of the exercise to retrieve.
 * Method:
 *    PUT
 * Example Body:
 *    Image blob
 * Responses:
 *    200 - Successfully updated the exercise data.
 *        Example response:
 *        {
 *          name: string;
 *          primaryMuscles: string[];
 *          secondaryMuscles: string[];
 *          type: string;
 *          met: number;
 *          equipment: string;
 *          imageURL: string;
 *          videoURL: string | null;
 *        }
 *    400 - Invalid mime type of media.
 *    401 - User is unauthenticated.
 *    404 - Exercise with this name is not found.
 *    500 - Unknown server error.
 */
router.put("/image/:name", updateExerciseImage);

/**
 * Updates metadata of an exercise by name.
 * If you want to refer to available values of equipment, muscles, or exercise types,
 * see /src/Exercise/array.ts
 *
 * Path:
 *    /api/exercise/meta/:name
 * URL Params:
 *    name [String] - The name of the exercise to retrieve.
 * Method:
 *    PUT
 * Example Body (Sent with JSON):
 *    {
 *      primaryMuscles: string[];
 *      secondaryMuscles: string[];
 *      type: string;
 *      met: number;
 *      equipment: string;
 *    }
 * Responses:
 *    200 - Successfully updated the exercise data.
 *        Example response:
 *        {
 *          name: string;
 *          primaryMuscles: string[];
 *          secondaryMuscles: string[];
 *          type: string;
 *          met: number;
 *          equipment: string;
 *          imageURL: string;
 *          videoURL: string | null;
 *        }
 *    400 - Invalid structure of an exercise.
 *    401 - User is unauthenticated.
 *    404 - Exercise with this name is not found.
 *    500 - Unknown server error.
 */
router.put("/meta/:name", updateExerciseMetadata);

export default router;
