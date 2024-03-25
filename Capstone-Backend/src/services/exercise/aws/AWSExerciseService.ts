import Exercise, {
  ExerciseImage,
  ExerciseVideo,
  ExerciseWithMedia,
  instanceOfExercise,
  instanceOfExerciseImage,
  instanceOfExerciseVideo,
} from "../../../interfaces/Exercise";
import IExerciseService from "../IExerciseService";
import InvalidStructure from "../../../errors/classes/InvalidStructure";
import DynamoDBWrapper from "../../../utils/wrappers/DynamoDBWrapper";
import S3Wrapper from "../../../utils/wrappers/S3Wrapper";
import NotFound from "../../../errors/classes/NotFound";

/**
 * Service class for managing exercises within an AWS environment. This service
 * utilizes AWS DynamoDB for storage and AWS S3 for media file management.
 */
class AWSExerciseService implements IExerciseService {
  private dynamoDBWrapper: DynamoDBWrapper;
  private s3Wrapper: S3Wrapper;

  /**
   * Constructs an AWSExerciseService instance with dependencies.
   *
   * @param {DynamoDBWrapper} dynamoDBWrapper - Wrapper for DynamoDB operations.
   * @param {S3Wrapper} s3Wrapper - Wrapper for S3 operations.
   */
  constructor(dynamoDBWrapper: DynamoDBWrapper, s3Wrapper: S3Wrapper) {
    this.dynamoDBWrapper = dynamoDBWrapper;
    this.s3Wrapper = s3Wrapper;
  }

  /**
   * Adds a new exercise along with its image and optionally a video.
   *
   * @param {Exercise} exercise - The exercise data.
   * @param {ExerciseImage} image - The image associated with the exercise.
   * @param {ExerciseVideo | undefined} video - The optional video associated with the exercise.
   * @return {Promise<ExerciseWithMedia>} The added exercise with media URLs.
   */
  async addExercise(
    exercise: Exercise,
    image: ExerciseImage,
    video: ExerciseVideo | undefined
  ): Promise<ExerciseWithMedia> {
    this.validateExercise(exercise);
    this.validateImage(image);
    if (video) {
      this.validateVideo(video);
    }

    await this.dynamoDBWrapper.updateItem(exercise);
    await this.s3Wrapper.updateItem(
      image.buffer,
      `Exercise/Image/${exercise.name}`
    );
    if (video)
      {await this.s3Wrapper.updateItem(
        video.buffer,
        `Exercise/Video/${exercise.name}`
      );}

    const exercisesWithSignedUrl = await this.attachSignedURLsForExercise(
      exercise
    );
    return exercisesWithSignedUrl;
  }

  /**
   * Updates the metadata for an exercise.
   *
   * @param {Exercise} exercise - The new exercise data.
   * @return {Promise<ExerciseWithMedia>} The updated exercise.
   */
  async updateExerciseMetadata(exercise: Exercise): Promise<ExerciseWithMedia> {
    this.validateExercise(exercise);
    await this.dynamoDBWrapper.updateItem(exercise);
    const exercisesWithSignedUrl = await this.attachSignedURLsForExercise(
      exercise
    );
    return exercisesWithSignedUrl;
  }

  /**
   * Updates the image for an exercise.
   *
   * @param {string} name - The name of the exercise to update.
   * @param {ExerciseImage} image - The new image data.
   * @return {Promise<ExerciseWithMedia>} The updated exercise with the new image URL.
   */
  async updateExerciseImage(
    name: string,
    image: ExerciseImage
  ): Promise<ExerciseWithMedia> {
    const exercise = await this.getExercise(name);
    if (exercise == null) {
      throw new NotFound(`Exercise with name [${name}] is not found!`);
    }

    this.validateImage(image);
    await this.s3Wrapper.updateItem(image, `Exercise/Image/${exercise.name}`);
    const exerciseWithURLs = await this.attachSignedURLsForExercise(exercise);
    return exerciseWithURLs;
  }

  /**
   * Updates the video for an exercise.
   *
   * @param {string} name - The name of the exercise to update.
   * @param {ExerciseVideo} video - The new video data.
   * @return {Promise<ExerciseWithMedia>} The updated exercise with the new video URL.
   */
  async updateExerciseVideo(
    name: string,
    video: ExerciseVideo
  ): Promise<ExerciseWithMedia> {
    const exercise = await this.getExercise(name);
    if (exercise == null) {
      throw new NotFound(`Exercise with name [${name}] is not found!`);
    }

    this.validateVideo(video);
    await this.s3Wrapper.updateItem(video, `Exercise/Video/${exercise.name}`);
    const exerciseWithURLs = await this.attachSignedURLsForExercise(exercise);
    return exerciseWithURLs;
  }

  /**
   * Removes an exercise from the system.
   *
   * @param {string} name - The name of the exercise to remove.
   * @return {Promise<void>}
   */
  async removeExercise(name: string): Promise<void> {
    const exercise = await this.getExercise(name);

    if (exercise === null) {
      throw new NotFound(`Exercise with name [${name}] is not found!`);
    } else {
      await this.dynamoDBWrapper.removeItem(name);
      await this.s3Wrapper.removeItem(`Exercise/Image/${name}`);
      await this.s3Wrapper.removeItem(`Exercise/Video/${name}`);
    }
  }

  /**
   * Retrieves a single exercise by name.
   *
   * @param {string} name - The name of the exercise to retrieve.
   * @return {Promise<ExerciseWithMedia | null>} The exercise with media URLs or null if not found.
   */
  async getExercise(name: string): Promise<ExerciseWithMedia | null> {
    const exercise = await this.dynamoDBWrapper.getItem<Exercise>("name", name);
    if (exercise == null) return null;
    const exercisesWithSignedUrl = await this.attachSignedURLsForExercise(
      exercise
    );
    return exercisesWithSignedUrl;
  }

  /**
   * Retrieves all exercises.
   *
   * @return {Promise<ExerciseWithMedia[]>} An array of exercises with their media URLs.
   */
  async getExercises(): Promise<ExerciseWithMedia[]> {
    const exercises = await this.dynamoDBWrapper.getItems<Exercise>();
    const exercisesWithSignedUrls = await Promise.all(
      exercises.map(
        async (exercise) => await this.attachSignedURLsForExercise(exercise)
      )
    );
    return exercisesWithSignedUrls;
  }

  /**
   * Attaches signed URLs for an exercise's image and video stored in S3.
   *
   * @param {Exercise} exercise - The exercise to attach URLs.
   * @return {Promise<ExerciseWithMedia>} The exercise with attached media URLs.
   */
  private async attachSignedURLsForExercise(
    exercise: Exercise
  ): Promise<ExerciseWithMedia> {
    this.validateExercise(exercise);

    const name = exercise.name;
    const imageURL = await this.s3Wrapper.getSignedURL(
      `Exercise/Image/${name}`
    );

    const videoExists = await this.s3Wrapper.doesSignedURLExist(
      `Exercise/Video/${name}`
    );
    const videoURL = videoExists ?
      await this.s3Wrapper.getSignedURL(`Exercise/Video/${name}`) :
      null;

    return { ...exercise, imageURL, videoURL }; // Combine exercise data with signed URLs
  }

  /**
   * Validates an exercise object's structure.
   *
   * @param {Exercise} exercise - The exercise to validate.
   */
  private validateExercise(exercise: Exercise) {
    if (!instanceOfExercise(exercise)) {
      throw new InvalidStructure(
        "The body of the exercise does not follow the correct structure."
      );
    }
  }

  /**
   * Validates an ExerciseImage object's structure.
   *
   * @param {ExerciseImage} image - The image to validate.
   */
  private validateImage(image: ExerciseImage) {
    if (!instanceOfExerciseImage(image)) {
      throw new InvalidStructure(
        "Image is not valid (check available mime types)"
      );
    }
  }

  /**
   * Validates an ExerciseVideo object's structure.
   *
   * @param {ExerciseVideo} video - The video to validate.
   */
  private validateVideo(video: ExerciseVideo) {
    if (!instanceOfExerciseVideo(video)) {
      throw new InvalidStructure(
        "Video is not valid (check available mime types)"
      );
    }
  }
}

export default AWSExerciseService;
