"use client";
import { useContext } from "react";
import { ExercisesContext } from "../providers/ExercisesContext";

/**
 * Custom hook for accessing the exercises context within a component.
 * This hook abstracts the useContext hook usage for ExercisesContext, providing
 * a direct way to access the exercises data throughout the application.
 *
 * Usage:
 * Ensure your component tree is wrapped in an ExercisesProvider that provides the
 * necessary context value. Then, you can use this hook in any component to access
 * the exercises data.
 *
 * Example:
 * 
 * import useExercises from 'path/to/useExercises';
 *
 * const MyComponent = () => {
 *   const exercises = useExercises();
 *
 *   // Use the exercises data in your component.
 *   return <div>{exercises ? exercises.map(exercise => <div key={exercise.id}>{exercise.name}</div>) : 'Loading...'}</div>;
 * };
 *
 * This hook will return the exercises data from ExercisesContext. If the data
 * is not yet available or there is no provider up the component tree, it returns null.
 * Components using this hook should handle the null state appropriately.
 */
const useExercises = () => {
  return useContext(ExercisesContext);
};

export default useExercises;
