import { findComponentPos, findElement } from "./reducerHelpers";

/**
 * A reducer function for managing the state of a workout.
 * @param {Object} draft - The current state of the workout. It should have the following structure:
 * {
 *   name: string,          // The name of the workout
 *   elements: Array,       // An array of workout elements, each with properties like index, exerciseName, and components
 *   username: string       // Username of the workout owner (used when assigning a workout)
 * }
 * @param {Object} action - The action to be processed, which includes type and payload. Example:
 * {
 *   type: string,         // Type of action to be performed
 *   payload: Object       // Data needed for the action
 * }
 */
export default function workoutReducer(draft, action) {
  const { type, payload } = action;
  console.log(type);
  
  switch (type) {
    // Case handling for various actions:
    case "remove_component":
      removeComponent(draft.elements, payload.elementIndex, payload.componentIndex);
      break;
    case "add_component":
      addComponent(draft.elements, payload.elementIndex, payload.component);
      break;
    case "update_component":
      updateComponent(draft.elements, payload.elementIndex, payload.component);
      break;
    case "reorder_components":
      reorderComponents(draft.elements, payload.elementIndex, payload.components);
      break;
    case "remove_element":
      removeElement(draft.elements, payload.elementIndex);
      break;
    case "add_element":
      addElement(draft.elements, payload);
      break;
    case "reset_workout":
      resetWorkout(draft);
      break;
    case "assign_workout":
      assignWorkout(draft, payload.username);
      break;
    case "rename_workout":
      renameWorkout(draft, payload.name);
      break;
    default:
      console.log('UNKNOWN ACTION TYPE!');
      break;
  }
}

/**
 * Adds a new element to the workout.
 * @param {Array} elements - The current array of workout elements in the draft.
 * @param {Object} element - The new workout element to be added.
 */
function addElement(elements, element) {
  const addedElementIndex = elements.length;

  const elementCopy = {
    ...element,
    index: addedElementIndex,
  };

  element.index = addedElementIndex;
  elements.push(elementCopy);
}

/**
 * Removes an element from the workout.
 * @param {Array} elements - The current array of workout elements in the draft.
 * @param {number} elementIndex - The index of the element to be removed.
 */
function removeElement(elements, elementIndex) {
  const elementPosition = elements.findIndex(
    (element) => element.index === elementIndex
  );

  if (elementPosition !== -1) {
    elements.splice(elementPosition, 1);
  }

  // Update the index for remaining elements
  for (let i = 0; i < elements.length; ++i) {
    elements[i].index = i;
  }
}

/**
 * Updates a component in a workout element.
 * @param {Array} elements - The array of workout elements.
 * @param {number} elementIndex - The index of the element containing the component to be updated.
 * @param {Object} updatedComponent - The new component data to replace the old component.
 */
function updateComponent(elements, elementIndex, updatedComponent) {
  const element = findElement(elements, elementIndex);

  if (element) {
    const componentPos = findComponentPos(element, updatedComponent.index);
    if (componentPos !== -1) {
      element.components[componentPos] = updatedComponent;
    }
  }
}

/**
 * Removes a component from an element.
 * @param {Array} elements - The array of workout elements.
 * @param {number} elementIndex - The index of the element from which the component should be removed.
 * @param {number} componentIndex - The index of the component to remove.
 */
function removeComponent(elements, elementIndex, componentIndex) {
  const element = findElement(elements, elementIndex);
  if (element) {
    const componentPos = findComponentPos(element, componentIndex);
    if (componentPos !== -1) {
      element.components.splice(componentPos, 1);

      // Update the index for remaining components
      for (let i = 0; i < element.components.length; i++) {
        element.components[i].index = i;
      }
    }
  }
}

/**
 * Adds a component to an element.
 * @param {Array} elements - The array of workout elements.
 * @param {number} elementIndex - The index of the element to which the component will be added.
 * @param {Object} component - The component to be added.
 */
function addComponent(elements, elementIndex, component) {
  const element = findElement(elements, elementIndex);
  const componentCopy = {
    ...component,
  };

  if (element) {
    const addedComponentIndex = element.components.length;
    componentCopy.index = addedComponentIndex;
    element.components.push(componentCopy);
  }
}

/**
 * Reorders the components within an element.
 * @param {Array} elements - The array of workout elements.
 * @param {number} elementIndex - The index of the element whose components are to be reordered.
 * @param {Array} components - The new array of components in the desired order.
 */
function reorderComponents(elements, elementIndex, components) {
  const element = findElement(elements, elementIndex);

  if (element) {
    element.components = components;
  }
}

/**
 * Resets the workout to its initial state.
 * @param {Object} draft - The draft state that will be reset.
 */
function resetWorkout(draft) {
  draft.name = '';
  draft.elements = [];
}

/**
 * Assigns a workout to a user.
 * @param {Object} draft - The current workout draft.
 * @param {string} username - The username to assign the workout to.
 */
function assignWorkout(draft, username) {
  draft.username = username;
}

/**
 * Renames the workout.
 * @param {Object} draft - The current workout draft.
 * @param {string} name - The new name for the workout.
 */
function renameWorkout(draft, name) {
  draft.name = name;
}