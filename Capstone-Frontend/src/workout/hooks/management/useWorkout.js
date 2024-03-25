import { useContext } from 'react';
import { WorkoutContext } from '../../providers/management/WorkoutContext';

/**
 * Custom hook for accessing the workout context within a component.
 * This hook abstracts the useContext hook usage for WorkoutContext, providing
 * a direct way to access the workout state throughout the application.
 *
 * Usage:
 * Ensure your component tree is wrapped in a WorkoutProvider that provides the
 * necessary context value. Then, you can use this hook in any component to access
 * the workout state.
 *
 * Example:
 * 
 * import useWorkout from 'path/to/useWorkout';
 *
 * const MyComponent = () => {
 *   const workout = useWorkout();
 *
 *   // Use the workout state in your component.
 *   return <div>{workout ? <div>Current Workout Name: {workout.name}</div> : 'No workout data'}</div>;
 * };
 *
 * This hook will return the workout state from WorkoutContext. If the state
 * is not yet available or there is no provider up the component tree, it returns null.
 * Components using this hook should handle the null state appropriately.
 */
const useWorkout = () => {
  return useContext(WorkoutContext);
}

export default useWorkout;
