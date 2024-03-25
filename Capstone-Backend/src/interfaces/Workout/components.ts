import TypeValidator from "../../utils/other/TypeValidator";
import { COMPONENT_TYPES } from "./arrays";

/**
 * Represents a base workout component within a workout element.
 */
interface Component {
  /**
   * The type of the component, which must be one of the predefined component types.
   */
  type: (typeof COMPONENT_TYPES)[number];

  /**
   * The index or order of the component within a workout element.
   */
  index: number;
}

/**
 * Represents a component where the exercise is performed for a specific number of repetitions.
 */
export interface RepsComponent extends Component {
  type: "Reps";

  /**
   * The number of repetitions to be performed.
   */
  reps: number;
}

/**
 * Represents a component where the exercise is performed with an additional weight for a specific number
 * of repetitions.
 */
export interface WeightedRepsComponent extends Component {
  type: "Weighted_Reps";

  /**
   * The number of repetitions to be performed.
   */
  reps: number;

  /**
   * The weight to be used for the exercise.
   */
  weight: number;
}

/**
 * Represents a rest or break component within a workout element.
 */
export interface RestComponent extends Component {
  type: "Rest";
  duration: number;
}

/**
 * Validates if an object is an instance of the Component interface.
 *
 * @param {any} object - The object to be validated.
 * @return {boolean} - True if the object is a valid Component, false otherwise.
 */
export function instanceOfComponent(object: any): object is Component {
  const isValidType = COMPONENT_TYPES.includes(object.type);

  if (!isValidType || !TypeValidator.isPositiveNumberOrZero(object.index))
    {return false;}

  const componentObj = object as Component;
  console.log(object);

  if (componentObj.type === "Reps") return instanceOfRepsComponent(object);
  if (componentObj.type === "Weighted_Reps")
    {return instanceOfWeightedRepsComponent(object);}
  if (componentObj.type === "Rest") return instanceOfRestComponent(object);

  return false;
}

/**
 * Validates if an object is an instance of the RepsComponent interface.
 *
 * @param {any} object - The object to be validated.
 * @return {boolean} - True if the object is a valid RepsComponent, false otherwise.
 */
function instanceOfRepsComponent(object: any): object is RepsComponent {
  return object.type == "Reps" && TypeValidator.isPositiveNumber(object.reps);
}

/**
 * Validates if an object is an instance of the WeightedRepsComponent interface.
 *
 * @param {any} object - The object to be validated.
 * @return {boolean} - True if the object is a valid WeightedRepsComponent, false otherwise.
 */
function instanceOfWeightedRepsComponent(object: any): object is RepsComponent {
  return (
    object.type == "Weighted_Reps" &&
    TypeValidator.isPositiveNumber(object.reps) &&
    TypeValidator.isPositiveNumber(object.weight)
  );
}

/**
 * Validates if an object is an instance of the RestComponent interface.
 *
 * @param {any} object - The object to be validated.
 * @return {boolean} - True if the object is a valid RestComponent, false otherwise.
 */
function instanceOfRestComponent(object: any): object is RestComponent {
  return (
    object.type == "Rest" && TypeValidator.isPositiveNumber(object.duration)
  );
}

export default Component;
