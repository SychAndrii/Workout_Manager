'use client';

import { createContext } from "react";

/**
 * React context for the workout state, initialized with a default value of null.
 * This context provides a way to access and manage the workout state across the component tree
 * without the need for prop drilling.
 *
 * Usage:
 * 1. Encapsulate your component tree with the WorkoutProvider, which will assign the workout state
 *    to this context, enabling any child component to access the workout state.
 *
 * <WorkoutProvider initialValue={initialWorkoutState}>
 *   <YourComponent />
 * </WorkoutProvider>
 *
 * 2. Within any component inside the WorkoutProvider tree, you can access the workout state like this:
 *
 * import useWorkout from '../hooks/useWorkout';
 *
 * const workout = useWorkout();
 *
 * Now, `workout` holds the state of the workout, allowing the component to render based on the workout state
 * or use it in logic and event handlers.
 *
 * Note: Initially, the context will have a null value until it is provided with the workout state by the WorkoutProvider.
 * Components using this context should account for the possibility of a null state.
 */
export const WorkoutContext = createContext(null);

/**
 * React context for the workout dispatch function, initialized with null. 
 * This context provides components the ability to dispatch actions to the workout reducer,
 * enabling state updates in response to user actions or lifecycle events.
 *
 * Usage:
 * 1. Your component tree should be wrapped with the WorkoutProvider to gain access to the dispatch function.
 *
 * <WorkoutProvider initialValue={initialWorkoutState}>
 *   <YourComponent />
 * </WorkoutProvider>
 *
 * 2. Access the workout dispatch function within any component inside the WorkoutProvider:
 *
 * import useWorkoutDispatch from '../hooks/useWorkoutDispatch';
 *
 * const dispatch = useWorkoutDispatch();
 *
 * With `dispatch`, you can now dispatch actions to the workout reducer, which will update the workout state accordingly.
 *
 * Note: The dispatch function will be null until it is provided by the WorkoutProvider. Ensure that components
 * using this context handle the null case appropriately, typically by guarding against null before using `dispatch`.
 */
export const WorkoutDispatchContext = createContext(null);
