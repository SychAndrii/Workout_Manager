/**
 * Creates an action object to add a new element to the workout, which is based on the provided exercise.
 * The new element will contain the exercise itself and an initially empty array of components.
 *
 * @param {Object} exercise - The exercise object to be added as a new element in the workout.
 * @returns {Object} An action object to be dispatched in the workout reducer to add the new element.
 */
const addElementAction = (exercise) => {
  return {
    type: 'add_element',
    payload: {
      exercise,  // The exercise to be included in the new workout element.
      components: []  // Initializes an empty array for components of this new element.
    }
  };
}

export default addElementAction;
