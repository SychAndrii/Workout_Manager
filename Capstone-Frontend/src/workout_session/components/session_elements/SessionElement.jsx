import React from "react";
import { Stepper, Step } from "@material-tailwind/react";
import RestIcon from "@/src/ui/icons/RestIcon";
import BarbellIcon from "@/src/ui/icons/BarbellIcon";
import { Button } from "@/components/ui/button";
import ComponentWrapper from "../session_components/ComponentWrapper";
import useWorkoutSessionDispatch from "../../hooks/useWorkoutSessionDispatch";
import updateComponentDoneAction from "../../actions/updateComponentAction";
import useWorkoutSession from "../../hooks/useWorkoutSession";
import useWorkout from "@/src/workout/hooks/management/useWorkout";
import incrementCurrentElementAction from "../../actions/incrementCurrentElement";
import decrementCurrentElementAction from "../../actions/decrementCurrentElementAction";

const SessionElement = ({ element }) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const sessionDispatch = useWorkoutSessionDispatch();
  const session = useWorkoutSession();
  const workout = useWorkout();

  console.log(session.current);
  const currentElementIndex = session.current.elementIndex;
  const isAtLastElement = currentElementIndex !== workout.elements.length - 1;
  const isAtFirstElement = currentElementIndex !== 0;

  const updateComponentHandler = (updateStrategy) => {
    sessionDispatch(updateComponentDoneAction(element, updateStrategy));
  };

  const nextExerciseHandler = () => {
    if (isAtLastElement) {
      sessionDispatch(incrementCurrentElementAction());
    }
  };

  const previousExerciseHandler = () => {
    if (isAtFirstElement) {
      sessionDispatch(decrementCurrentElementAction());
    }
  };

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);

  return (
    <div className="w-full py-4 px-8">
      <Stepper
        activeStep={activeStep}
        isLastStep={(value) => setIsLastStep(value)}
      >
        {element.components.map((c, index) => {
          return (
            <Step onClick={() => setActiveStep(index)}>
              {c.type === "Rest" && <RestIcon />}
              {c.type !== "Rest" && (
                <EquipmentIconFactory equipment={element.exercise.equipment} />
              )}
            </Step>
          );
        })}
      </Stepper>
      <div className="my-8 flex gap-4 justify-end">
        <Button disabled={!isAtFirstElement} onClick={previousExerciseHandler}>
          Switch to previous exercise
        </Button>
        <Button disabled={!isAtLastElement} onClick={nextExerciseHandler}>
          Switch to next exercise
        </Button>
        <Button
          onClick={handleNext}
          className="bg-green-400 hover:bg-green-300"
          disabled={isLastStep}
        >
          Done
        </Button>
      </div>
      <ComponentWrapper
        exercise={element.exercise}
        component={element.components[activeStep]}
        updateComponentDone={updateComponentHandler}
      />
    </div>
  );
};

const EquipmentIconFactory = ({ equipment }) => {
  return <>{equipment === "Barbell" && <BarbellIcon />}</>;
};

export default SessionElement;
