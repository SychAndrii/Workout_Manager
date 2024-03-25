/**
 * Creates an action object to remove a specific element from the workout. The action uses
 * the index of the element to identify which one to remove.
 *
 * @param {Object} element - The element to be removed from the workout. The element must have an 'index' property.
 * @returns {Object} An action object to be dispatched in the workout reducer to remove the specified element.
 */
const removeElementAction = (element) => {
  return {
    type: "remove_element",
    payload: {
      elementIndex: element.index, // The index of the element to be removed.
    },
  };
};

export default removeElementAction;
