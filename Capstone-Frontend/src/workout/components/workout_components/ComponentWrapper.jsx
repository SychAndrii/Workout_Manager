import React from "react";
import RestComponent from "./RestComponent";
import WeightedRepsComponent from "./WeightedRepsComponent";
import { Button } from "@aws-amplify/ui-react";

/**
 * A wrapper component that renders either a RestComponent or WeightedRepsComponent 
 * based on the type of the passed component.
 * It also provides a button to remove the component.
 *
 * @param {Object} props - The properties passed to the ComponentWrapper.
 * @param {Object} props.component - The component object that contains details like type and associated data.
 * @param {Function} props.updateComponent - The function to call for updating the component.
 * @param {Function} props.removeComponent - The function to call when the component needs to be removed.
 * @returns {ReactElement} The ComponentWrapper element containing either a RestComponent or WeightedRepsComponent and a remove button.
 */
const ComponentWrapper = ({ component, updateComponent, removeComponent, met }) => {
  // Handler to call the removeComponent function with the current component.
  const removeHandler = () => {
    removeComponent(component);
  };

  return (
    <div className=" w-[90%] bg-blue-300 mb-2 p-2 mx-auto">
      {/* Conditionally render the appropriate component based on the component's type */}
      <div>
        {component.type == "Weighted_Reps" && (
          <WeightedRepsComponent update={updateComponent} component={component} met={met} />
        )}
        {component.type === "Rest" && (
          <RestComponent update={updateComponent} component={component} />
        )}
      </div>
      {/* Render the remove button */}
      <div className=" flex gap-3">
        <Button variant="destructive" onClick={removeHandler}>
          Remove
        </Button>
      </div>
    </div>
  );
};

export default ComponentWrapper;
