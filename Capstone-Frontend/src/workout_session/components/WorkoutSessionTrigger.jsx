import incrementCurrentAction from "../actions/incrementCurrentElement";
import useWorkoutSessionDispatch from "../hooks/useWorkoutSessionDispatch";

const WorkoutSessionTrigger = ({ children }) => {
  const workoutSessionDispatch = useWorkoutSessionDispatch();

  const showIntro = () => {
    workoutSessionDispatch(incrementCurrentAction());
  };

  return <div onClick={showIntro}>{children}</div>;
};

export default WorkoutSessionTrigger;
