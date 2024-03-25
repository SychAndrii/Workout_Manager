/**
 * A custom hook that provides a template for an empty workout object.
 * This can be useful for initializing state or resetting to a default empty workout.
 *
 * @returns {Object} An object representing an empty workout with predefined structure.
 */
const useEmptyWorkout = () => {
  return {
    elements: [], // An empty array indicating no workout elements.
    name: "New Workout", // Default name for a new or reset workout.
    username: "", // Empty username indicating no user is associated yet.
  };
};

export default useEmptyWorkout;
