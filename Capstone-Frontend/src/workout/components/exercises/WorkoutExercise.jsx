import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useWorkoutDispatch from "@/src/workout/hooks/management/useWorkoutDispatch";
import addElementAction from "../../actions/addElementAction";

/**
 * Displays detailed information about an exercise and provides an option to add it to the workout.
 * @param {Object} props - Component props.
 * @param {Object} props.exercise - Exercise details to be displayed.
 * @returns {ReactElement} - A rendered card component with exercise details.
 */
export default function WorkoutExercise({ exercise }) {
  // Use the workout dispatch hook to get the dispatch function for the workout context.
  const workoutDispatch = useWorkoutDispatch();

  /**
   * Handles the addition of an exercise to the workout by dispatching an action.
   */
  const onExerciseAdd = () => {
    console.log(exercise);
    // Create an action with the exercise details to add it to the workout.
    const action = addElementAction(exercise);
    // Dispatch the action to update the workout state.
    workoutDispatch(action);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{exercise.name}</CardTitle>
        {/* Potential description can be added here */}
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex">
          <div className="w-[100px] h-[100px] relative mr-5">
            {/* Exercise image */}
            <Image src={exercise.imageURL} fill alt={exercise.name} />
          </div>
          <div>
            {/* List primary muscles */}
            <h3>
              Primary muscles: <b>{exercise.primaryMuscles.join(", ")}</b>
            </h3>
            {/* List secondary muscles */}
            <h3>
              Secondary muscles: <b>{exercise.secondaryMuscles.join(", ")}</b>
            </h3>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        {/* Buttons for additional actions */}
        <Button variant="outline">View details</Button>
        <Button onClick={onExerciseAdd}>Add to the workout</Button>
      </CardFooter>
    </Card>
  );
}
