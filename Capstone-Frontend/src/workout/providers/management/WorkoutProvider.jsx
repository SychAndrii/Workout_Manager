// Directive to ensure this code is run in a client environment, not on the server.
"use client";

import React from "react";
import { useImmerReducer } from "use-immer";
import { WorkoutContext, WorkoutDispatchContext } from "./WorkoutContext";
import workoutReducer from "./workoutReducer";

/**
 * Provides a WorkoutContext and WorkoutDispatchContext to its child components, enabling them to access and manipulate the workout state.
 * This provider uses the useImmerReducer hook to facilitate state management, allowing components to perform actions 
 * on the workout state in an immutable fashion. The initial workout state is set based on the passed `initialValue` prop.
 *
 * @param {Object} props - The props object for the WorkoutProvider.
 * @param {ReactNode} props.children - The child components that will be granted access to the workout contexts.
 * @param {Object} props.initialValue - The initial value for the workout state, used by the reducer to establish the initial state.
 *   The structure is as follows:
 *   {
 *     name: string,        // The workout's name
 *     elements: Array,     // An array of workout elements, each describing a part of the workout
 *     username: string     // The username of the individual who created or is assigned the workout
 *   }
 *
 * Usage:
 * Wrap your component tree with WorkoutProvider to give child components access to the workout context:
 * <WorkoutProvider initialValue={yourInitialValue}>
 *   <YourComponent />
 * </WorkoutProvider>
 *
 * Inside YourComponent or its descendants, access the workout state and dispatch function like so:
 * const workout = useWorkout();
 * const dispatch = useWorkoutDispatch();
 *
 * These contexts will provide the current workout state and a dispatch function to update that state,
 * respectively. Child components can dispatch actions to update the workout state as needed.
 */
const WorkoutProvider = ({ children, initialValue }) => {
  // Use useImmerReducer hook to manage the workout state with immer's benefits (e.g., simpler immutable state updates).
  const [workout, dispatch] = useImmerReducer(workoutReducer, initialValue);

  return (
    // Provide the workout state and dispatch function through their respective contexts
    // so they can be accessed by any child component within this context provider.
    <WorkoutContext.Provider value={workout}>
      <WorkoutDispatchContext.Provider value={dispatch}>
        {children}{" "}
        {/* Render child components that will have access to the context. */}
      </WorkoutDispatchContext.Provider>
    </WorkoutContext.Provider>
  );
};

export default WorkoutProvider;
