import { Drawer } from "@/src/ui/components/Drawer";
import useWorkoutSession from "../hooks/useWorkoutSession";
import ElementIntro from "./session_elements/ElementIntro";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import SessionElement from "./session_elements/SessionElement";

const WorkoutSession = ({ children }) => {
  const workoutSession = useWorkoutSession();

  const current = workoutSession.current;

  const content =
    current.componentIndex === -1 || current.elementIndex === -1 ? null : (
      <ElementIntro
        message={
          <h1 className=" font-bold text-2xl">
            Your workout is about to start!
          </h1>
        }
      >
        <div className=" p-3">
          <SessionElement
            key={`${current.elementIndex}-${current.componentIndex}`}
            element={workoutSession.elements[current.elementIndex]}
          />
        </div>
      </ElementIntro>
    );

  return (
    <Drawer
      fullScreen={true}
      trigger={children}
      content={content}
      title={
        <div className=" w-full p-3">
          <div className=" flex justify-between items-center w-full">
            <div className=" flex gap-4 items-center">
              <Button variant="secondary">View Workout</Button>
              <h3>Exercises Done: 0/2</h3>
            </div>
            <Button>Finish Workout</Button>
          </div>
          <Separator className="mt-3" />
        </div>
      }
    />
  );
};

export default WorkoutSession;
