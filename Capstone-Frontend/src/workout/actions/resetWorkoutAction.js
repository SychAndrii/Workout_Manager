/**
 * Creates an action to reset the workout to its initial state.
 * This action is used to clear all the details and components of the current workout,
 * effectively resetting its state to the default or initial setup.
 *
 * This function does not require parameters since the reset action does not depend on specific data to function.
 *
 * @returns {Object} An action object with a type of "reset_workout".
 *   When this action is dispatched and processed by the workoutReducer,
 *   it will clear the current state of the workout, removing all elements, names, and associated data,
 *   reverting the workout to its initial or default state.
 */
const resetWorkoutAction = () => {
  return {
    type: "reset_workout"
  };
};

export default resetWorkoutAction;
