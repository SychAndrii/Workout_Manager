"use client";
import { Drawer } from "@/src/ui/components/Drawer";
import Workout from "@/src/workout/components/Workout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Exercises from "../exercises/WorkoutExerciseList";

const WorkoutManager = ({ children, submitHandler }) => {
  return (
    <Tabs defaultValue="workout" className={`overflow-auto`}>
      <Drawer
        fullScreen={true}
        trigger={children}
        content={
          <div className="px-5">
            {/* Display the workout and exercises tabs. */}
            <TabsContent value="workout">
              <Workout />
            </TabsContent>
            <TabsContent value="exercises" key="exercises">
              <Exercises />
            </TabsContent>
          </div>
        }
        title={
          <TabsList className="w-full">
            <TabsTrigger className="w-[50%]" value="workout">
              Workout
            </TabsTrigger>
            <TabsTrigger className="w-[50%]" value="exercises">
              Exercises
            </TabsTrigger>
          </TabsList>
        }
        footer={submitHandler}
      />
    </Tabs>
  );
};

export default WorkoutManager;
