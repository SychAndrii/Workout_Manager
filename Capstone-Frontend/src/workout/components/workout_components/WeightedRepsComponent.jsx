import React from "react";
import { Button } from "@/components/ui/button";
import UpdateWeight from "../../actions/update/UpdateWeight";
import UpdateReps from "../../actions/update/UpdateReps";
import useUserProfile from "@/src/auth/hooks/useUser";
import { setsRepsCals } from "@/src/calories/utils/calculateCals";

/**
 * A component comprising a workout element that involves repetitions with weight, 
 * allowing for the adjustment of its weight and repetitions.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.component - The weighted reps component object, 
 * containing at least 'weight' and 'reps' properties.
 * @param {Function} props.update - The function to call when either the weight or reps need to be updated.
 */
const WeightedRepsComponent = ({ component, update, met }) => {
  /**
   * Handles the increment or decrement of the weight.
   * 
   * @param {number} amount - The amount to adjust the weight by. Can be negative or positive.
   */
  const updateWeightHandler = (amount) => {
    update(new UpdateWeight(component, amount));
  };

  /**
   * Handles the increment or decrement of the repetitions count.
   * 
   * @param {number} amount - The amount to adjust the repetitions by. Can be negative or positive.
   */
  const updateRepsHandler = (amount) => {
    update(new UpdateReps(component, amount));
  };

  const user = useUserProfile();
  const weight_in_kg = user.weight;

  return (
    <div>
      <div className="flex gap-4 items-center mb-3">
        <p className="w-[150px]">
          Weight: <span className="font-bold">{component.weight} kg</span>
        </p>
        {/* Buttons to increment or decrement the weight */}
        <Button onClick={() => updateWeightHandler(-1)}>-1</Button>
        <Button onClick={() => updateWeightHandler(+1)}>+1</Button>
      </div>
      <div className="flex gap-4 items-center">
        <p className="w-[150px]">
          Repetitions: <span className="font-bold">{component.reps}</span>
        </p>
        {/* Buttons to increment or decrement the repetitions */}
        <Button onClick={() => updateRepsHandler(-1)}>-1</Button>
        <Button onClick={() => updateRepsHandler(+1)}>+1</Button>
      </div>
      {/* Calorie loss displayed here */}
      <div className="flex gap-4 items-center">
        <p className="w-[350px]">
          Approximate calories lost: <span className="font-bold">{setsRepsCals(met, 1, component.reps, weight_in_kg).toFixed(0)} </span>cals
        </p>
      </div>
    </div>
  );
};

export default WeightedRepsComponent;
