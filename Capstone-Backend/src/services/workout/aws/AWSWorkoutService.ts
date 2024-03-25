import InvalidStructure from "../../../errors/classes/InvalidStructure";
import NotFound from "../../../errors/classes/NotFound";
import Workout, {
  NewWorkout,
  instanceOfWorkout,
} from "../../../interfaces/Workout";
import DynamoDBWrapper from "../../../utils/wrappers/DynamoDBWrapper";
import IExerciseService from "../../exercise/IExerciseService";
import IUserService from "../../user/IUserService";
import IWorkoutService from "../IWorkoutService";
import { v4 as uuidv4 } from "uuid";

/**
 * An implementation of the IWorkoutService interface that interacts with AWS DynamoDB
 * to manage workout-related operations. This service integrates with user and exercise
 * services to validate and manipulate workout data.
 */
class AWSWorkoutService implements IWorkoutService {
  private dynamoDB: DynamoDBWrapper;
  private userService: IUserService;
  private exerciseService: IExerciseService;

  /**
   * Constructs an AWSWorkoutService with dependencies for interacting with data stores and other services.
   *
   * @param {DynamoDBWrapper} dynamoDBWrapper - A wrapper for DynamoDB interactions.
   * @param {IUserService} userService - A service for user-related operations.
   * @param {IExerciseService} exerciseService - A service for exercise-related operations.
   */
  constructor(
    dynamoDBWrapper: DynamoDBWrapper,
    userService: IUserService,
    exerciseService: IExerciseService
  ) {
    this.dynamoDB = dynamoDBWrapper;
    this.userService = userService;
    this.exerciseService = exerciseService;
  }

  getWorkout(id: string, userID: string): Promise<Workout> {
    throw new Error("Method not implemented.");
  }

  removeWorkout(id: string, userID: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  updateWorkout(workout: Workout): Promise<Workout> {
    throw new Error("Method not implemented.");
  }

  likeWorkout(workoutID: string, userID: string): Promise<Workout> {
    throw new Error("Method not implemented.");
  }

  async getUserWorkouts(
    requestUsername: string,
    ownerUsername: string
  ): Promise<Workout[]> {
    const conditions: {
      username: string;
      visibility?: string;
    } = {
      username: ownerUsername,
    };

    if (requestUsername !== ownerUsername) {
      conditions.visibility = "Public";
    }

    const foundWorkouts = await this.dynamoDB.getItems<Workout>(conditions);

    for (const workout of foundWorkouts) {
      const w = workout as any;
      if (!instanceOfWorkout(w)) {
        throw new InvalidStructure(`One of your workouts does not follow Workout interface! Workout ID: [${w.id}]`);
      }
    }

    return foundWorkouts;
  }

  getMostPopularWorkouts(): Promise<Workout[]> {
    throw new Error("Method not implemented.");
  }

  /**
   * Adds a new workout to DynamoDB after validating it against the workout schema and business logic.
   *
   * @param {NewWorkout} workout - The new workout data to be added.
   * @return {Promise<Workout>} The added workout with an ID and initial metadata.
   */
  async addWorkout(workout: NewWorkout): Promise<Workout> {
    const addedWorkout: Workout = {
      ...workout,
      id: uuidv4(),
      likes: 0,
      visibility: "Private",
    };

    await this.validateWorkout(addedWorkout);
    await this.dynamoDB.updateItem(addedWorkout);
    return addedWorkout;
  }

  /**
   * Validates the workout data against business logic and data integrity constraints.
   *
   * @param {Workout} workout - The workout to validate.
   * @throws {InvalidStructure} If the workout does not comply with the expected structure or business rules.
   * @throws {NotFound} If any elements within the workout refer to non-existent users or exercises.
   */
  private async validateWorkout(workout: Workout) {
    if (!instanceOfWorkout(workout)) {
      throw new InvalidStructure(
        `The workout you are trying to add does not follow the Workout interface`
      );
    }

    const userExists = await this.userService.usernameExists(workout.username);

    if (!userExists) {
      throw new NotFound(`The user with specified username does not exist!`);
    }

    for (const element of workout.elements) {
      const exercise = await this.exerciseService.getExercise(
        element.exerciseName
      );

      if (!exercise) {
        throw new NotFound(`One of your elements has non-existent exercise!`);
      }

      const components = element.components;
      for (const c of components) {
        if (c.type !== "Rest" && c.type !== exercise.type) {
          throw new InvalidStructure(
            "One of your components does not have same active type as the exercise!"
          );
        }
      }
    }
  }
}

export default AWSWorkoutService;
