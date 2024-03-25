class UpdateDoneStrategy {
  constructor(component, validateProp, defaultProp) {
    this.component = component;
    // Check if the validateProp is a valid property of the component.
    if (!(validateProp in this.component)) {
      throw new Error(
        `Invalid update done strategy picked for ${this.component.type} component!`
      );
    }

    if(component[defaultProp] === undefined) {
      component[defaultProp] = 0;
    }
  }

  /**
   * The update method that should be implemented by subclasses to apply the specific update strategy.
   * @abstract
   * @throws {Error} - Throws an error if called directly on the abstract class, indicating that this method should be overridden.
   */
  update() {
    throw new Error("UpdateDoneStrategy is an abstract class!");
  }
}

export default UpdateDoneStrategy;
