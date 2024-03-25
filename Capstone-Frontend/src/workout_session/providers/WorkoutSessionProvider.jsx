"use client";

import React from "react";
import { useImmerReducer } from "use-immer";
import {
  WorkoutSessionContext,
  WorkoutSessionDispatchContext,
} from "./WorkoutSessionContext";
import workoutSessionReducer from "./workoutSessionReducer";
import UpdateStrategiesConstructorsFactory from "../factories/UpdateStrategiesConstructorsFactory";

const WorkoutSessionProvider = ({ children, workout }) => {
  const workoutSesison = {
    current: {
      elementIndex: -1,
      componentIndex: -1
    },
    ...workout,
    elements: workout.elements.map((el) => ({
      ...el,
      components: el.components.map((c) => {
        const updateStrategiesConstructors = new UpdateStrategiesConstructorsFactory().create(c.type);
        let updatedComponent = {
          ...c
        };

        for (const strategyConstructor of updateStrategiesConstructors) {
          updatedComponent = strategyConstructor(updatedComponent).update();
        }
        return updatedComponent;
      }),
    })),
    date: new Date(),
  };

  const [workoutSession, dispatch] = useImmerReducer(
    workoutSessionReducer,
    workoutSesison
  );

  return (
    <WorkoutSessionContext.Provider value={workoutSession}>
      <WorkoutSessionDispatchContext.Provider value={dispatch}>
        {children}
      </WorkoutSessionDispatchContext.Provider>
    </WorkoutSessionContext.Provider>
  );
};

export default WorkoutSessionProvider;
