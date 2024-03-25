'use client';
import { useEffect, useState } from "react";
import { UserWorkoutsContext } from "./UserWorkoutsContext";
import useUserProfile from "@/src/auth/hooks/useUser";
import useIdToken from "@/src/auth/hooks/useIdToken";

const UserWorkoutsProvider = ({ children }) => {
  const [workouts, setWorkouts] = useState(null);
  const token = useIdToken();
  const user = useUserProfile();

  useEffect(() => {
    async function fetchData() {
      if (token && user) {
        const url = `${process.env.NEXT_PUBLIC_BACKEND_API}api/workout?requestUsername=${user.username}&ownerUsername=${user.username}`;

        const res = await fetch(url, {
          headers: new Headers({
            Authorization: `Bearer ${token}`,
          }),
        });
        const data = await res.json();

        // Update the exercises state with the fetched data.
        setWorkouts(data);
      }
    }

    // Trigger the data fetch when the token becomes available.
    fetchData();
  }, [token, user]);

  return (
    <UserWorkoutsContext.Provider value={workouts}>
      {children}
    </UserWorkoutsContext.Provider>
  );
};

export default UserWorkoutsProvider;
