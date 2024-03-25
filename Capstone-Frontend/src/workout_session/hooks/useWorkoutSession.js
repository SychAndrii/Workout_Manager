import { useContext } from 'react'
import { WorkoutSessionContext } from '../providers/WorkoutSessionContext'

const useWorkoutSession = () => {
  return useContext(WorkoutSessionContext);
}

export default useWorkoutSession