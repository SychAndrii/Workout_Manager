import Component, { instanceOfComponent } from "./components";
import { WORKOUT_VISIBILITY } from "./arrays";
import TypeValidator from "../../utils/other/TypeValidator";

/**
 * Defines the structure of a single workout element, which consists of an exercise
 * and its associated components (like sets and rests).
 */
export interface WorkoutElement {
  exerciseName: string;
  components: Component[];
  index: number;
}

/**
 * Validates if the given object conforms to the WorkoutElement interface.
 *
 * @param {any} object - The object to validate.
 * @return {boolean} True if the object is a valid WorkoutElement, false otherwise.
 */
function instanceOfWorkoutElement(object: any): object is WorkoutElement {
  return (
    TypeValidator.isPositiveNumberOrZero(object.index) &&
    TypeValidator.isNotEmptyString(object.exerciseName) &&
    TypeValidator.isNotEmptyArray(object.components) &&
    object.components.filter((el: any) => !instanceOfComponent(el)).length == 0
  );
}

/**
 * Represents the visibility status of a workout, derived from predefined constants.
 */
type WorkoutVisibility = (typeof WORKOUT_VISIBILITY)[number];

/**
 * Validates if the given object is a valid WorkoutVisibility value.
 *
 * @param {any} object - The object to validate.
 * @return {boolean} True if the object is a valid WorkoutVisibility, false otherwise.
 */
function instanceOfWorkoutVisibility(object: any): object is WorkoutVisibility {
  return WORKOUT_VISIBILITY.includes(object);
}

/**
 * Represents an array of WorkoutElement instances.
 */
type WorkoutElements = WorkoutElement[];

/**
 * Validates an array of objects to check if each one conforms to the WorkoutElement interface.
 *
 * @param {any} object - The array to validate.
 * @return {boolean} True if all objects in the array are valid WorkoutElements, false otherwise.
 */
function instanceOfWorkoutElements(object: any): object is WorkoutElements {
  if (!TypeValidator.isNotEmptyArray(object)) {
    return false;
  }

  console.log("VALID ARRAY PASSED");

  const invalidElementsCount = object.filter(
    (el: any) => !instanceOfWorkoutElement(el)
  ).length;

  if (invalidElementsCount !== 0) return false;

  console.log("VALID ELEMENTS PASSED");

  // Structure correctly follows the interface, the only thing left is to validate indexes
  const workoutElements = object as WorkoutElements;

  return validateElementsIndexes();

  function validateElementsIndexes() {
    const elementsIndexes = workoutElements.map(
      (_: WorkoutElement, index: number) => index
    );

    for (const index of elementsIndexes) {
      const elementWithIndex = workoutElements.find(
        (element: WorkoutElement) => element.index === index
      );

      if (!elementWithIndex) {
        return false;
      }

      if (!validateComponentsIndexes(elementWithIndex.components)) {
        return false;
      }
    }

    return true;
  }

  function validateComponentsIndexes(components: Component[]) {
    const componentIndexes = components.map(
      (_: Component, index: number) => index
    );

    for (const componentIndex of componentIndexes) {
      const componentWithIndex = components.find(
        (component: Component) => component.index === componentIndex
      );

      if (!componentWithIndex) {
        return false;
      }

      if (componentWithIndex.type === "Rest") {
        const isRestAtFirstOrLastIndex =
          componentIndex === 0 ||
          componentIndex === componentIndexes.length - 1;

        if (isRestAtFirstOrLastIndex) {
          return false;
        }

        const leftNeighbour = components.find(
          (component: Component) => component.index === componentIndex - 1
        );

        if (leftNeighbour?.type === "Rest") {
          return false;
        }

        const rightNeighbour = components.find(
          (component: Component) => component.index === componentIndex + 1
        );

        if (rightNeighbour?.type === "Rest") {
          return false;
        }
      }
    }

    return true;
  }
}

/**
 * Represents the structure which is required for creating a new workout.
 */
export interface NewWorkout {
  username: string;
  name: string;
  elements: WorkoutElements;
}

/**
 * Represents the full structure of a workout, extending NewWorkout with additional
 * properties like ID, likes, and visibility.
 */
interface Workout extends NewWorkout {
  id: string;
  visibility: WorkoutVisibility;
  likes: number;
}

/**
 * Validates if the given object conforms to the Workout interface.
 *
 * @param {any} object - The object to validate.
 * @return {boolean} True if the object is a valid Workout, false otherwise.
 */
export function instanceOfWorkout(object: any): object is Workout {
  return (
    TypeValidator.isNotEmptyString(object.username) &&
    TypeValidator.isNotEmptyString(object.name) &&
    instanceOfWorkoutElements(object.elements) &&
    TypeValidator.isNotEmptyString(object.id) &&
    instanceOfWorkoutVisibility(object.visibility) &&
    TypeValidator.isPositiveNumberOrZero(object.likes)
  );
}

export default Workout;
