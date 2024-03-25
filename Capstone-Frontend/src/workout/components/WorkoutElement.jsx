"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { ReactSortable } from "react-sortablejs";
import { Button } from "@/components/ui/button";
import ComponentWrapper from "./workout_components/ComponentWrapper";
import useWorkoutDispatch from "../hooks/management/useWorkoutDispatch";
import removeElementAction from "../actions/removeElementAction";
import reorderComponentsAction from "../actions/reorderComponentsAction";
import addComponentAction from "../actions/addComponentAction";
import updateComponentAction from "../actions/updateComponentAction";
import removeComponentAction from "../actions/removeComponentAction";
import useExercises from "@/src/exercise/hooks/useExercises";

/**
 * Represents a single workout element in the workout structure, allowing for the management
 * and interaction of its components, such as adding, removing, or reordering them.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.element - The workout element data, including the exercise and its components.
 */
const WorkoutElement = React.memo(({ element }) => {
  const workoutDispatcher = useWorkoutDispatch();
  const hasActiveComponentAdded = useRef(false);
  const exercise = element.exercise;

  // Initializes default components for a new element if not already present.
  useEffect(() => {
    if (element.components.length === 0 && !hasActiveComponentAdded.current) {
      ["Active", "Rest", "Active", "Rest", "Active"].forEach((type) => {
        workoutDispatcher(addComponentAction(element, type));
      });
      hasActiveComponentAdded.current = true;
    }
  }, [element.components.length, workoutDispatcher, element]);

  // Handlers for various actions within the workout element.
  const updateComponentHandler = (updateComponentStrategy) => {
    workoutDispatcher(updateComponentAction(element, updateComponentStrategy));
  };

  const removeComponentHandler = (component) => {
    workoutDispatcher(removeComponentAction(element, component));
  };

  const removeHandler = () => {
    workoutDispatcher(removeElementAction(element));
  };

  const addActiveComponentHandler = () => {
    workoutDispatcher(addComponentAction(element, "Active"));
  };

  const addRestComponentHandler = () => {
    workoutDispatcher(addComponentAction(element, "Rest"));
  };

  return (
    exercise && (
      <div>
        <div className="bg-green-300 w-full flex justify-between py-2 px-3 items-center">
          <div className="flex gap-3">
            <div className="w-[100px] h-[100px] relative">
              <Image src={exercise.imageURL} fill alt={exercise.name} />
            </div>
            <h2 className="text-2xl font-bold">{exercise.name}</h2>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={addActiveComponentHandler}>
              Add set
            </Button>
            <Button variant="secondary" onClick={addRestComponentHandler}>
              Add rest
            </Button>
            <Button variant="destructive" onClick={removeHandler}>
              Remove
            </Button>
          </div>
        </div>
        <ReactSortable
          animation={200}
          delayOnTouchStart={true}
          delay={2}
          onStart={(evt) => evt.stopPropagation()}
          list={element.components.map((component) => ({ ...component }))}
          setList={(newComponents) => {
            workoutDispatcher(reorderComponentsAction(element, newComponents));
          }}
        >
          {element.components.map((c) => (
            <ComponentWrapper
              removeComponent={removeComponentHandler}
              updateComponent={updateComponentHandler}
              component={c}
              met={exercise.met}
              key={c.index}
            />
          ))}
        </ReactSortable>
      </div>
    )
  );
});

export default WorkoutElement;
