"use client";
import useUserProfile from "@/src/auth/hooks/useUser";
import WorkoutElement from "./WorkoutElement";
import useWorkout from "../hooks/management/useWorkout";
import useWorkoutDispatch from "../hooks/management/useWorkoutDispatch";
import resetWorkoutAction from "../actions/resetWorkoutAction";
import assignWorkoutAction from "../actions/assignWorkoutAction";
import { Input } from "@/components/ui/input";
import renameWorkoutAction from "../actions/renameWorkoutAction";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import useExercises from "@/src/exercise/hooks/useExercises";

/**
 * A component that displays the current workout, allowing users to modify its name,
 * reset it, or add new workout elements. The workout can be reset to a default state, 
 * and each element within the workout can be individually managed.
 */
const Workout = () => {
  // Access the current workout state.
  const workout = useWorkout();
  // Access the dispatch function to modify the workout state.
  const workoutDispatch = useWorkoutDispatch();
  // Access the current user's profile.
  const user = useUserProfile();
  const exercises = useExercises();
  
  if(workout.name === 'Custom Workout') {
    console.log(workout);
  }

  /**
   * Resets the current workout to a default state, assigns it to the current user, 
   * and renames it to "New Workout".
   */
  const resetWorkout = () => {
    workoutDispatch(resetWorkoutAction());
    workoutDispatch(assignWorkoutAction(user));
    workoutDispatch(renameWorkoutAction("New Workout"));
  }

  useEffect(() => {
    workoutDispatch(assignWorkoutAction(user));
  }, []);

  /**
   * Handles the reset button click, triggering the workout reset process.
   */
  const handleReset = () => {
    resetWorkout();
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="gap-3 flex justify-between">
        {/* Input field for renaming the workout */}
        <Input
          value={workout.name}
          onChange={(e) => workoutDispatch(renameWorkoutAction(e.target.value))}
          className="w-full"
        />
        {/* Button to reset the workout */}
        <Button onClick={handleReset}>Reset</Button>
      </div>
      <div>
        {/* Conditionally render workout elements or a message to add exercises */}
        {!workout || workout.elements.length === 0 ? (
          <h2 className="text-center font-bold">Add exercises!</h2>
        ) : (
          workout.elements.map((element) => (
            <WorkoutElement element={element} key={element.index} />
          ))
        )}
      </div>
    </div>
  );
};

export default Workout;
