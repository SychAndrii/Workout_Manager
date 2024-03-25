/**
 * An abstract class representing a strategy for updating a component.
 * This class provides a base structure for defining specific update strategies
 * for different types of workout components.
 *
 * @class
 * @abstract
 */
class UpdateComponentStrategy {
  /**
   * Creates an instance of UpdateComponentStrategy.
   *
   * @param {Object} component - The component object that will be updated.
   * @param {string} validateProp - The property to validate if the strategy can be applied to the component.
   * @throws {Error} - Throws an error if the validateProp does not exist in the component, indicating an invalid strategy.
   */
  constructor(component, validateProp) {
    this.component = component;
    // Check if the validateProp is a valid property of the component.
    if (!(validateProp in this.component)) {
      throw new Error(
        `Invalid update strategy picked for ${this.component.type} component!`
      );
    }
  }

  /**
   * The update method that should be implemented by subclasses to apply the specific update strategy.
   * @abstract
   * @throws {Error} - Throws an error if called directly on the abstract class, indicating that this method should be overridden.
   */
  update() {
    throw new Error("UpdateComponentStrategy is an abstract class!");
  }
}

export default UpdateComponentStrategy;
