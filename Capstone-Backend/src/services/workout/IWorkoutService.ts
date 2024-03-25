import Workout, { NewWorkout } from "../../interfaces/Workout";

/**
 * Interface for a service that manages workout-related operations,
 * providing methods to add, retrieve, update, remove, and interact with workouts.
 */
interface IWorkoutService {
  /**
   * Adds a new workout to the system.
   *
   * @param {NewWorkout} workout - The workout data to be added.
   * @returns {Promise<Workout>} A promise that resolves with the added workout.
   */
  addWorkout(workout: NewWorkout): Promise<Workout>;
  getWorkout(id: string, userID: string): Promise<Workout>;
  removeWorkout(id: string, userID: string): Promise<void>;
  updateWorkout(workout: Workout): Promise<Workout>;

  likeWorkout(workoutID: string, userID: string): Promise<Workout>;
  getUserWorkouts(requestUsername: string, ownerUsername: string): Promise<Workout[]>;
  getMostPopularWorkouts(): Promise<Workout[]>;
}

export default IWorkoutService;
