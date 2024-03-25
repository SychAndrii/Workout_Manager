import useExercises from "@/src/exercise/hooks/useExercises";
import { useCallback } from "react";

const useBackendToFrontendTransformer = () => {
  const exercises = useExercises();

  const transformer = (backendWorkout) => {
    if (!backendWorkout || !exercises) return null;

    const frontendWorkout = {
      name: backendWorkout.name,
      username: backendWorkout.username,
      elements: backendWorkout.elements.map((element) => ({
        ...element,
      })),
    };

    for (const element of frontendWorkout.elements) {
      if (frontendWorkout.name === "Custom Workout")
        console.log(element.exercise);
      element.exercise = exercises?.find(
        (e) => e.name === element.exerciseName
      );

      if (frontendWorkout.name === "Custom Workout")
        console.log(element.exercise);
    }

    return frontendWorkout;
  };

  return transformer;
};

export default useBackendToFrontendTransformer;
