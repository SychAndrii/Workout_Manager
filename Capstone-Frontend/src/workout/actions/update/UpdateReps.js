import UpdateComponentStrategy from "./UpdateComponentStrategy";

/**
 * A concrete strategy class for updating the 'reps' property of a component.
 * This class extends UpdateComponentStrategy to implement a specific update logic for the number of repetitions (reps).
 */
class UpdateReps extends UpdateComponentStrategy {
  /**
   * Constructs an instance of UpdateReps with the component to update and the number to adjust the reps by.
   * @param {Object} component - The component object that will have its reps updated. Must have a 'reps' property.
   * @param {number} number - The number to adjust the reps by. Can be positive (to increase reps) or negative (to decrease reps).
   */
  constructor(component, number) {
    super(component, 'reps');
    this.number = number;
  }

  /**
   * Applies the reps update strategy to the component. If the updated reps count is greater than 0,
   * it returns a new component object with the updated reps. Otherwise, it returns the original component.
   * 
   * @returns {Object} - The component with the updated reps if the new reps count is positive; otherwise, the original component.
   */
  update() {
    const updatedReps = this.component.reps + this.number;
    return updatedReps > 0
      ? {
          ...this.component,
          reps: updatedReps,
        }
      : this.component;
  }
}

export default UpdateReps;
