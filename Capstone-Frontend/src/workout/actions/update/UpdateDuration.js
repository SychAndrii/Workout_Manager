import UpdateComponentStrategy from "./UpdateComponentStrategy";

/**
 * A concrete strategy class for updating the duration property of a component.
 * This class extends UpdateComponentStrategy to provide specific logic for adjusting the duration.
 */
class UpdateDuration extends UpdateComponentStrategy {
  /**
   * Constructs an instance of UpdateDuration with the component to update and the adjustment number.
   * @param {Object} component - The component object that will have its duration updated. Must have a 'duration' property.
   * @param {number} number - The amount to adjust the duration by. Can be positive or negative.
   */
  constructor(component, number) {
    super(component, "duration");
    this.number = number;
  }

  /**
   * Applies the duration update strategy to the component. 
   * If the updated duration is greater than 5, it returns a new component object with the updated duration.
   * Otherwise, it returns the original component without changes to ensure the duration does not drop below a threshold.
   * 
   * @returns {Object} - The component with the updated duration if the new duration is greater than 5; otherwise, the original component.
   */
  update() {
    const updatedDuration = this.component.duration + this.number;
    return updatedDuration > 5
      ? {
          ...this.component,
          duration: updatedDuration,
        }
      : this.component;
  }
}

export default UpdateDuration;
