import Exercise, {
  ExerciseImage,
  ExerciseVideo,
  ExerciseWithMedia,
} from "../../interfaces/Exercise";

/**
 * Interface for a service that manages exercise data, including CRUD operations and media management.
 */
interface IExerciseService {
  /**
   * Adds a new exercise to the system along with its associated image and optionally a video.
   *
   * @param exercise - The exercise data excluding media.
   * @param image - The image associated with the exercise.
   * @param video - An optional video associated with the exercise.
   * @returns {Promise<ExerciseWithMedia>} A promise that resolves with the newly created exercise, including its media.
   */
  addExercise(
    exercise: Exercise,
    image: ExerciseImage,
    video: ExerciseVideo | undefined
  ): Promise<ExerciseWithMedia>;

  /**
   * Removes an exercise from the system.
   *
   * @param name - The name of the exercise to be removed.
   * @returns {Promise<void>} A promise that resolves when the exercise has been successfully removed.
   */
  removeExercise(name: string): Promise<void>;

  /**
   * Retrieves an exercise by its name.
   *
   * @param name - The name of the exercise to retrieve.
   * @returns {Promise<ExerciseWithMedia | null>} A promise that resolves with the exercise data including media, or null if not found.
   */
  getExercise(name: string): Promise<ExerciseWithMedia | null>;

  /**
   * Retrieves all exercises in the system.
   *
   * @returns {Promise<ExerciseWithMedia[]>} A promise that resolves with an array of all exercises, including their media.
   */
  getExercises(): Promise<ExerciseWithMedia[]>;

  /**
   * Updates the metadata for an existing exercise.
   *
   * @param exercise - The exercise data to update, excluding media.
   * @returns {Promise<ExerciseWithMedia>} A promise that resolves with the updated exercise data, including media.
   */
  updateExerciseMetadata(exercise: Exercise): Promise<ExerciseWithMedia>;

  /**
   * Updates the image for a specified exercise.
   *
   * @param name - The name of the exercise for which to update the image.
   * @param image - The new image data.
   * @returns {Promise<ExerciseWithMedia>} A promise that resolves with the exercise data including the updated image.
   */
  updateExerciseImage(
    name: string,
    image: ExerciseImage
  ): Promise<ExerciseWithMedia>;

  /**
   * Updates the video for a specified exercise.
   *
   * @param name - The name of the exercise for which to update the video.
   * @param video - The new video data.
   * @returns {Promise<ExerciseWithMedia>} A promise that resolves with the exercise data including the updated video.
   */
  updateExerciseVideo(
    name: string,
    video: ExerciseVideo
  ): Promise<ExerciseWithMedia>;
}

export default IExerciseService;
