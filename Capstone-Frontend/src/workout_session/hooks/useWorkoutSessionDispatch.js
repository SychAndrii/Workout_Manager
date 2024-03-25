import { useContext } from 'react'
import { WorkoutSessionDispatchContext } from '../providers/WorkoutSessionContext'

const useWorkoutSessionDispatch = () => {
  return useContext(WorkoutSessionDispatchContext);
}

export default useWorkoutSessionDispatch