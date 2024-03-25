import ComponentFactory from "./ComponentFactory";

/**
 * A concrete factory class that extends the abstract ComponentFactory to create
 * "Reps" workout component instances.
 */
class GetRepsComponentFactory extends ComponentFactory {
  /**
   * Constructs an instance of GetRepsComponentFactory.
   * @param {number} reps - The number of repetitions for the component. Must be greater than 0.
   * @throws {Error} Throws an error if the reps value is less than or equal to 0.
   */
  constructor(reps) {
    super();
    if (reps <= 0) {
      throw new Error("Reps cannot be <= 0!");
    }
    this.reps = reps;
  }

  /**
   * Creates and returns a "Reps" component with the specified number of repetitions.
   * @returns {Object} An object representing a "Reps" type workout component.
   */
  getComponent() {
    return {
      type: "Reps",
      reps: this.reps,
    };
  }
}

export default GetRepsComponentFactory;
