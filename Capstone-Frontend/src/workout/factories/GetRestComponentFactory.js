import ComponentFactory from "./ComponentFactory";

/**
 * A concrete factory class that extends the abstract ComponentFactory to create
 * "Rest" type workout component instances.
 */
class GetRestComponentFactory extends ComponentFactory {
  /**
   * Constructs an instance of GetRestComponentFactory.
   * @param {number} secondsDuration - The duration of the rest period in seconds. Must be greater than 0.
   * @throws {Error} Throws an error if the duration is less than or equal to 0.
   */
  constructor(secondsDuration) {
    super();
    if (secondsDuration <= 0) {
      throw new Error("Duration cannot be <= 0!");
    }
    this.duration = secondsDuration;
  }

  /**
   * Creates and returns a "Rest" type component with the specified duration.
   * @returns {Object} An object representing a "Rest" type workout component, specifying the duration of the rest.
   */
  getComponent() {
    return {
      type: "Rest",
      duration: this.duration,
    };
  }
}

export default GetRestComponentFactory;
