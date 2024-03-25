import useEmptyWorkout from "@/src/workout/hooks/fetch/useEmptyWorkout";
import AddWorkout from "@/src/workout/components/workout_managers/AddWorkout";
import UpdateWorkout from "@/src/workout/components/workout_managers/UpdateWorkout";
import { Button } from "@/components/ui/button";
import WorkoutProvider from "@/src/workout/providers/management/WorkoutProvider";
import usePersonalWorkouts from "@/src/workout/hooks/fetch/usePersonalWorkouts";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useBackendToFrontendTransformer from "@/src/workout/hooks/utils/useBackendToFrontendTransformer";
import React from "react";
import WorkoutSessionProvider from "@/src/workout_session/providers/WorkoutSessionProvider";
import WorkoutSession from "@/src/workout_session/components/WorkoutSession";
import WorkoutSessionTrigger from "@/src/workout_session/components/WorkoutSessionTrigger";

const WorkoutsTab = () => {
  const emptyWorkout = useEmptyWorkout();
  const personalWorkouts = usePersonalWorkouts();
  const backendToFrontendTransformer = useBackendToFrontendTransformer();

  return (
    <div>
      <WorkoutProvider initialValue={emptyWorkout}>
        <AddWorkout>
          <Button>Add new workout</Button>
        </AddWorkout>
      </WorkoutProvider>
      <Table>
        <TableCaption>A list of your workouts</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Workout Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {personalWorkouts?.map((w) => {
            const frontendWorkout = backendToFrontendTransformer(w);
            // Log only if frontendWorkout has a truthy value
            if (frontendWorkout?.name === "Custom Workout") {
              console.log(frontendWorkout);
            }

            // Check if frontendWorkout and its name property are truthy before rendering the row
            return frontendWorkout && frontendWorkout.name ? (
              <WorkoutProvider initialValue={frontendWorkout}>
                <TableRow className="flex items-center">
                  <TableCell className="font-medium flex-1">
                    {frontendWorkout.name}
                  </TableCell>
                  <TableCell>
                    <UpdateWorkout>
                      <Button>Update workout</Button>
                    </UpdateWorkout>
                  </TableCell>
                  <TableCell>
                    <WorkoutSessionProvider workout={frontendWorkout}>
                      <WorkoutSession>
                        <WorkoutSessionTrigger>
                          <Button>Start workout</Button>
                        </WorkoutSessionTrigger>
                      </WorkoutSession>
                    </WorkoutSessionProvider>
                  </TableCell>
                </TableRow>
              </WorkoutProvider>
            ) : null;
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default React.memo(WorkoutsTab);
