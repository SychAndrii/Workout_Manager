import UpdateComponentStrategy from "./update/UpdateComponentStrategy";

/**
 * Creates an action to update a specific component within a workout element.
 * This action facilitates modifying the details of a component based on a provided update strategy.
 *
 * @param {Object} element - The workout element containing the component to be updated.
 *   The element object must include an 'index' property that indicates its position within the workout.
 * @param {UpdateComponentStrategy} updateStrategy - An object encapsulating the update logic for the component.
 *   This object should contain an 'update' method that, when called, returns the updated component.
 *
 * @returns {Object} An action object with a type of "update_component" and a payload containing
 *   the index of the element and the updated component. When dispatched, this action instructs
 *   the workoutReducer to replace the old component with the updated one within the specified element.
 */
const updateComponentAction = (element, updateStrategy) => {
  return {
    type: "update_component",
    payload: {
      elementIndex: element.index,
      component: updateStrategy.update()
    },
  };
};

export default updateComponentAction;
