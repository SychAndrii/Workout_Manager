'use client';

import { createContext } from "react";

/**
 * React context for exercises data, initialized with a default value of null.
 * This context can be used to provide exercises data throughout your component tree
 * without having to prop drill the exercises data to each component.
 *
 * Usage:
 * 1. Wrap your component tree with the ExercisesProvider, which should set the value of this context
 *    with the actual exercises data fetched from a backend or defined locally.
 * 
 * <ExercisesProvider>
 *   <YourComponent />
 * </ExercisesProvider>
 *
 * 2. In any component within the ExercisesProvider tree, you can access the exercises context like so:
 * 
 * import useExercises from '../hooks/useExercises';
 * 
 * const exercises = useExercises();
 *
 * This will provide the component access to the exercises data, allowing it to react to the data
 * or trigger updates based on user interaction or other events.
 *
 * Note: The context will return null until it is set with actual data by the ExercisesProvider.
 * Ensure that components consuming this context can handle the null case appropriately.
 */
export const ExercisesContext = createContext(null);