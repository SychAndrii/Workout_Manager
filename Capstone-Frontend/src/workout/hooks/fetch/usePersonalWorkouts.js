import { useContext } from 'react'
import { UserWorkoutsContext } from '../../providers/fetch/UserWorkoutsContext'

const usePersonalWorkouts = () => {
  return useContext(UserWorkoutsContext);
}

export default usePersonalWorkouts