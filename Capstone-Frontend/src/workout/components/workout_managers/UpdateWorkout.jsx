"use client";
import useIdToken from "@/src/auth/hooks/useIdToken";
import useUserProfile from "@/src/auth/hooks/useUser";
import useWorkout from "@/src/workout/hooks/management/useWorkout";
import prepareWorkoutForBackend from "@/src/workout/utils/prepareWorkoutForBackend";
import { Button } from "@/components/ui/button";
import WorkoutManager from "./WorkoutManager";

const url = `${process.env.NEXT_PUBLIC_BACKEND_API}api/workout`;

/**
 * A component that provides an interface for creating a new workout,
 * allowing users to add exercises and submit the workout to a backend service.
 *
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - Child components or elements that trigger the opening of the add workout drawer.
 */
const UpdateWorkout = ({ children }) => {
  // Hook to access the current workout state.
  const workout = useWorkout();
  // Hook to access the current user's profile.
  const user = useUserProfile();
  // Hook to access the current user's ID token.
  const token = useIdToken();

  if(workout.name === 'Custom Workout')
    console.log(workout);

  /**
   * Handles the creation of a workout, sending the prepared workout data to the backend.
   */
  const updateWorkoutHandler = async () => {
    console.log('Update workout handler triggered');
  };

  return (
    <WorkoutManager
      submitHandler={
        <Button onClick={updateWorkoutHandler} className="w-full">
          Update Workout
        </Button>
      }
    >
      {children}
    </WorkoutManager>
  );
};

export default UpdateWorkout;
