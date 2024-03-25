/**
 * Finds and returns an element from the elements array based on its index.
 * @param {Array} elements - An array of workout elements where each element has an 'index' property.
 * @param {number} elementIndex - The index of the element to find.
 * @returns {Object | undefined} The found element with the specified index or undefined if not found.
 */
export function findElement(elements, elementIndex) {
  // Search for the element in the array matching the given index.
  const element = elements.find((el) => el.index === elementIndex);
  return element;
}

/**
 * Finds and returns the position (index) of a component within an element's components array.
 * @param {Object} element - The workout element object containing an array of components.
 * Each component in this array should have an 'index' property.
 * @param {number} componentIndex - The index of the component to find.
 * @returns {number} The index of the component within the element's components array or -1 if not found.
 */
export function findComponentPos(element, componentIndex) {
  // Search for the index of the component in the element's components array that matches the given component index.
  const componentPos = element.components.findIndex(
    (c) => c.index === componentIndex
  );
  return componentPos;
}