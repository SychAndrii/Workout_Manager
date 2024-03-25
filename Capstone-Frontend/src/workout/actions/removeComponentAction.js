/**
 * Creates an action object to remove a specific component from a workout element.
 * The action specifies which component to remove by including its index
 * and the index of the element it belongs to.
 *
 * @param {Object} element - The workout element object from which a component is to be removed.
 * @param {Object} component - The component object to be removed from the element.
 * @returns {Object} An action object to be dispatched in the workout reducer to remove the specified component.
 */
const removeComponentAction = (element, component) => {
  return {
    type: "remove_component",
    payload: {
      elementIndex: element.index,  // The index of the element from which the component will be removed.
      componentIndex: component.index,  // The index of the component to be removed.
    },
  };
};

export default removeComponentAction;
