/**
 * Creates an action object to assign the current workout to a specific user.
 * The action includes the user's username in the payload, which is used to update
 * the workout's association with the user.
 *
 * @param {Object} user - The user object containing at least a username property.
 * @returns {Object} An action object to be dispatched in the workout reducer to associate the workout with the given user.
 */
const assignWorkoutAction = (user) => {
  return {
    type: "assign_workout",
    payload: {
      username: user.username  // The username to which the workout will be assigned.
    }
  };
}

export default assignWorkoutAction;
