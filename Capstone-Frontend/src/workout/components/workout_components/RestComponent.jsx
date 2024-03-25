import React from "react";
import { Button } from "@/components/ui/button";
import UpdateDuration from "../../actions/update/UpdateDuration";

/**
 * A component representing a rest period within a workout, allowing for the adjustment of its duration.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.component - The rest component object, containing at least a 'duration' property.
 * @param {Function} props.update - The function to call when the duration needs to be updated.
 */
const RestComponent = ({ component, update }) => {
  /**
   * Handles the increment or decrement of the rest duration.
   * 
   * @param {number} amount - The amount to adjust the duration by. Can be negative or positive.
   */
  const updateDurationHandler = (amount) => {
    // Calls the update function with a new UpdateDuration strategy, adjusting the component's duration.
    update(new UpdateDuration(component, amount));
  };

  return (
    <div>
      <div className="flex gap-4 items-center mb-3">
        <p className="w-[150px]">
          Duration: <span className="font-bold">{component.duration} s</span>
        </p>
        {/* Buttons to increment or decrement the duration */}
        <Button onClick={() => updateDurationHandler(-1)}>-1</Button>
        <Button onClick={() => updateDurationHandler(+1)}>+1</Button>
      </div>
    </div>
  );
};

export default RestComponent;
