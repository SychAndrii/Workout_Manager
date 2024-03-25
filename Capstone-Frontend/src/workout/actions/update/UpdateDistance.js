import UpdateComponentStrategy from "./UpdateComponentStrategy";

/**
 * A concrete strategy class for updating the distance property of a component.
 * This class extends UpdateComponentStrategy to provide a specific update logic for distance adjustments.
 */
class UpdateDistance extends UpdateComponentStrategy {
  /**
   * Constructs an instance of UpdateDistance with the component to update and the adjustment number.
   * @param {Object} component - The component object that will have its distance updated. Must have a 'distance' property.
   * @param {number} number - The amount to adjust the distance by. Can be positive or negative.
   */
  constructor(component, number) {
    super(component, "distance");
    this.number = number;
  }

  /**
   * Applies the distance update strategy to the component. 
   * If the updated distance is greater than 0, it returns a new component object with the updated distance.
   * Otherwise, it returns the original component without changes.
   * 
   * @returns {Object} - The component with the updated distance if the new distance is positive; otherwise, the original component.
   */
  update() {
    const updatedDistance = this.component.distance + this.number;
    return updatedDistance > 0
      ? {
          ...this.component,
          distance: updatedDistance,
        }
      : this.component;
  }
}

export default UpdateDistance;
