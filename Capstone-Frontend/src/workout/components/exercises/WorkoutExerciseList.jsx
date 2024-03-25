"use client";
import React from "react";
import WorkoutExercise from "./WorkoutExercise";
import useExercises from "@/src/exercise/hooks/useExercises";

/**
 * A component that renders a list of WorkoutExercise components.
 * This component fetches an array of exercises using the useExercises custom hook
 * and maps through this array to render a WorkoutExercise component for each item.
 *
 * @returns {ReactElement} A list of WorkoutExercise components. Each component represents
 * an individual exercise and is rendered with its specific details.
 */
const WorkoutExerciseList = () => {
  // Fetches an array of exercise objects from the custom useExercises hook.
  const exercises = useExercises();
  console.log(exercises);

  // Conditionally renders a list of WorkoutExercise components by mapping over
  // the fetched exercises array, passing each exercise object to the WorkoutExercise component.
  return (
    exercises &&
    exercises.map((exercise) => (
      <WorkoutExercise key={exercise.name} exercise={exercise} />
    ))
  );
};

export default WorkoutExerciseList;
