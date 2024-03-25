import UpdateComponentStrategy from "./UpdateComponentStrategy";

/**
 * A concrete strategy class for updating the 'weight' property of a component.
 * This class extends UpdateComponentStrategy to provide specific update logic for the weight attribute in workout components.
 */
class UpdateWeight extends UpdateComponentStrategy {
  /**
   * Constructs an instance of UpdateWeight with the component to update and the number to adjust the weight by.
   * @param {Object} component - The component object that will have its weight updated. Must have a 'weight' property.
   * @param {number} number - The amount to adjust the weight by. Can be positive (to increase weight) or negative (to decrease weight).
   */
  constructor(component, number) {
    super(component, "weight");
    this.number = number;
  }

  /**
   * Applies the weight update strategy to the component. If the updated weight is greater than 0,
   * it returns a new component object with the updated weight. Otherwise, it returns the original component.
   * 
   * @returns {Object} - The component with the updated weight if the new weight is positive; otherwise, the original component.
   */
  update() {
    const updatedWeight = this.component.weight + this.number;
    return updatedWeight > 0
      ? {
          ...this.component,
          weight: updatedWeight,
        }
      : this.component;
  }
}

export default UpdateWeight;
