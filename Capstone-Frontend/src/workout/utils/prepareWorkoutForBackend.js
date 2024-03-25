/**
 * Transforms a workout object structured for the frontend into a format suitable for the backend.
 * This function adapts the workout data to align with the backend's expected structure,
 * ensuring compatibility and correct data interpretation when sending data to the backend.
 *
 * @param {Object} frontendWorkout - The workout object as structured for the frontend,
 *   which likely includes nested objects and additional properties not required or recognized by the backend.
 * @param {Object} user - The user object or data, which might be used to add user-specific information
 *   to the workout (not directly used in the current implementation but can be included for future scalability).
 *
 * @returns {Object} The transformed workout object that is structured according to the backend's requirements.
 *   This includes modifying or flattening nested structures, renaming properties to match backend expectations,
 *   and removing any frontend-specific properties that are not relevant to the backend.
 */
const prepareWorkoutForBackend = (frontendWorkout, user) => {
  const backendWorkout = {
    ...frontendWorkout
  };

  backendWorkout.elements = [];

  for (const frontendElement of frontendWorkout.elements) {
    const backendElement = {
      ...frontendElement,
    };

    // Assumes frontendElement has an 'exercise' property with nested exercise details.
    backendElement.exerciseName = frontendElement.exercise.name;
    
    // Removes the 'exercise' object after extracting necessary information,
    // as the backend expects only the exercise name, not a nested object.
    delete backendElement.exercise;

    backendWorkout.elements.push(backendElement);
  }

  return backendWorkout;
};

export default prepareWorkoutForBackend;
