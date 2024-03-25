/**
 * Creates an action object to rename the current workout. The new name is passed in the payload
 * and used to update the workout's name property in the state.
 *
 * @param {string} name - The new name to assign to the workout.
 * @returns {Object} An action object to be dispatched in the workout reducer to update the workout's name.
 */
const renameWorkoutAction = (name) => {
  return {
    type: "rename_workout",
    payload: {
      name, // The new name for the workout.
    },
  };
};

export default renameWorkoutAction;
