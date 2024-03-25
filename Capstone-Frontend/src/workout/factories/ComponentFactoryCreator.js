import ComponentFactory from "./ComponentFactory";
import GetRepsComponentFactory from "./GetRepsComponentFactory";
import GetRestComponentFactory from "./GetRestComponentFactory";
import GetWeightedRepsComponentFactory from "./GetWeightedRepsComponentFactory";

/**
 * A factory creator that returns an instance of a specific component factory
 * based on the provided exercise type. It abstracts the instantiation of
 * component factories, allowing for the dynamic creation of components based on the exercise type.
 *
 * @param {string} exerciseType - The type of exercise component to create, which determines the factory returned.
 * @returns {ComponentFactory} An instance of a specific component factory depending on the exerciseType argument.
 * @throws {Error} Throws an error if the exercise type is unknown, ensuring that only supported types are handled.
 */
const ComponentFactoryCreator = (exerciseType) => {
  // Instantiate and return specific component factories based on the exercise type.
  if (exerciseType == "Rest") {
    return new GetRestComponentFactory(60); // Returns a factory for rest components with a default duration.
  } else if (exerciseType == "Reps") {
    return new GetRepsComponentFactory(15); // Returns a factory for reps components with a default count.
  } else if (exerciseType == "Weighted_Reps") {
    return new GetWeightedRepsComponentFactory(15, 8); // Returns a factory for weighted reps with default values.
  } else {
    throw new Error("Unknown exercise type!"); // Ensures the exercise type is valid and supported.
  }
};

export default ComponentFactoryCreator;
