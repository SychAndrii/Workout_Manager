/**
 * Creates an action to reorder the components within a workout element.
 * This action is dispatched to update the state of a workout element, specifically to change the order of its components.
 *
 * @param {Object} element - The workout element whose components will be reordered.
 *   The element object should contain at least an 'index' property indicating its position within the workout.
 * @param {Array} components - The new array of components in the desired order.
 *   Each component in this array should maintain its structure but be placed in the new order.
 *
 * @returns {Object} An action object with a type of "reorder_components" and a payload containing
 *   the new array of components and the index of the element to be updated.
 *   The action object can be used in conjunction with the workoutReducer to update the state.
 */
const reorderComponentsAction = (element, components) => {
  return {
    type: "reorder_components",
    payload: {
      components,
      elementIndex: element.index,
    },
  };
};

export default reorderComponentsAction;
