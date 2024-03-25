import React from "react";
import SearchBar from "@/src/exercise/components/SearchBar";
import { SelectMuscle } from "@/src/exercise/components/SelectMuscle";
import useExercises from "@/src/exercise/hooks/useExercises";
import { useState, useEffect } from "react";
import WorkoutExercise from "@/src/workout/components/exercises/WorkoutExercise";

const ExercisesTab = () => {
  const exercises = useExercises();
  const [exercisesState, setExercisesState] = useState(exercises);

  useEffect(() => {
    setExercisesState(exercises);
  }, [exercises]);

  console.log(exercises);

  return (
    <div>
      <div className=" mb-2">
        {exercisesState && (
          <div className="flex-col space-y-2">
            <SearchBar
              collectionState={exercisesState}
              setCurrentCollection={setExercisesState}
              placeholder="Enter exercise name..."
              keys={["name"]}
            />
            <SelectMuscle
              collectionState={exercisesState}
              setCurrentCollection={setExercisesState}
              placeholder="Select muscles"
            />
          </div>
        )}
      </div>
      <div className="flex justify-evenly flex-wrap">
        {exercisesState?.map((exercise, index) => {
          return <WorkoutExercise key={index} exercise={exercise} />;
        })}
      </div>
    </div>
  );
};

export default ExercisesTab;
