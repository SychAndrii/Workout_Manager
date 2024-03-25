import React from "react";
import WeightedRepsComponent from "./WeightedRepsComponent";
import RestComponent from "./RestComponent";

const ComponentWrapper = ({ component, exercise, updateComponentDone }) => {
  return (
    <div key={component.index} className="flex flex-col gap-4">
      <div>
        {component.type == "Weighted_Reps" && (
          <WeightedRepsComponent
            component={component}
            updateDone={updateComponentDone}
          />
        )}
        {component.type === "Rest" && (
          <RestComponent
            component={component}
            updateDone={updateComponentDone}
          />
        )}
      </div>
      {component.type !== "Rest" && (
        <div>
          <h1 className="text-center">Exercise box</h1>
          <div className="w-[50%] h-[300px] mx-auto font-bold flex justify-center items-center border border-black">
            <h2 className="font-bold">{exercise.name}</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComponentWrapper;
