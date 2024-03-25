import ComponentFactory from "./ComponentFactory";

/**
 * A concrete factory class that extends the abstract ComponentFactory to create
 * "Weighted_Reps" type workout component instances.
 */
class GetWeightedRepsComponentFactory extends ComponentFactory {
  /**
   * Constructs an instance of GetWeightedRepsComponentFactory.
   * @param {number} weight - The weight to be used in the exercise component. Must be greater than 0.
   * @param {number} reps - The number of repetitions for the exercise component. Must be greater than 0.
   * @throws {Error} Throws an error if the weight or reps are less than or equal to 0.
   */
  constructor(weight, reps) {
    super();
    if (weight <= 0) {
      throw new Error("Weight cannot be <= 0!");
    }
    if (reps <= 0) {
      throw new Error("Reps cannot be <= 0!");
    }
    this.weight = weight;
    this.reps = reps;
  }

  /**
   * Creates and returns a "Weighted_Reps" type component with the specified weight and number of repetitions.
   * @returns {Object} An object representing a "Weighted_Reps" type workout component, specifying the weight used and the number of reps.
   */
  getComponent() {
    return {
      type: "Weighted_Reps",
      weight: this.weight,
      reps: this.reps,
    };
  }
}

export default GetWeightedRepsComponentFactory;
