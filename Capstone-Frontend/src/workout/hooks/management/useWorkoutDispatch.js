import { useContext } from 'react';
import { WorkoutDispatchContext } from '../../providers/management/WorkoutContext';

/**
 * Custom hook for accessing the workout dispatch context within a component.
 * This hook abstracts the useContext hook usage for WorkoutDispatchContext, providing
 * a direct way to access the dispatch function throughout the application. It allows
 * components to dispatch actions to the workout reducer, facilitating state updates.
 *
 * Usage:
 * Ensure your component tree is wrapped in a WorkoutProvider that provides the
 * necessary dispatch context value. Then, you can use this hook in any component to access
 * and dispatch actions to the workout state.
 *
 * Example:
 * 
 * import useWorkoutDispatch from 'path/to/useWorkoutDispatch';
 *
 * const MyComponent = () => {
 *   const dispatch = useWorkoutDispatch();
 *
 *   // Use the dispatch function to update the workout state.
 *   const updateWorkout = () => {
 *     dispatch(addElementAction(exercise));
 *   };
 *
 *   return <button onClick={updateWorkout}>Update Workout</button>;
 * };
 *
 * This hook will return the dispatch function from WorkoutDispatchContext. Components can use this
 * function to dispatch actions defined in the workout reducer. If there is no provider up the
 * component tree, it returns undefined. Ensure that components using this hook handle such cases appropriately.
 */
const useWorkoutDispatch = () => {
  return useContext(WorkoutDispatchContext);
}

export default useWorkoutDispatch;
