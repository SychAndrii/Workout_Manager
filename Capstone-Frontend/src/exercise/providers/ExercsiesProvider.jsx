"use client";
import React, { useEffect, useState } from "react";
import { ExercisesContext } from "./ExercisesContext";
import useIdToken from "@/src/auth/hooks/useIdToken";

/**
 * Provides an ExercisesContext to its child components, allowing them to access the fetched exercises data.
 * The provider fetches exercise data from a backend API using an authentication token and then passes this data
 * down the component tree via context. This setup enables any child component to access the exercises data
 * without having to fetch or manage the data itself.
 *
 * @param {Object} props - The props object.
 * @param {ReactNode} props.children - The child components that will have access to the ExercisesContext.
 *
 * Usage:
 * Wrap your component tree with the ExercisesProvider to grant access to the exercises context.
 * <ExercisesProvider>
 *   <YourComponent />
 * </ExercisesProvider>
 *
 * Inside YourComponent or its descendants, you can access the exercises context like so:
 * const exercises = useExercises();
 *
 * This context will provide the `exercises` data fetched from the server, or null if the data
 * is not yet available or if there was an error during fetching.
 *
 * Note:
 * The component relies on an environment variable `NEXT_PUBLIC_BACKEND_API` to construct the API endpoint URL.
 * Ensure this variable is set in your environment to avoid errors.
 */
const ExercisesProvider = ({ children }) => {
  const [exercises, setExercises] = useState(null);
  const token = useIdToken();
  const url = `${process.env.NEXT_PUBLIC_BACKEND_API}api/exercise`;

  useEffect(() => {
    async function fetchData() {
      // Check if the token is available before attempting to fetch data.
      if (token) {
        const res = await fetch(url, {
          headers: new Headers({
            Authorization: `Bearer ${token}`,
          }),
        });
        const data = await res.json();

        // Update the exercises state with the fetched data.
        setExercises(data);
      }
    }

    // Trigger the data fetch when the token becomes available.
    fetchData();
  }, [token]);

  return (
    <ExercisesContext.Provider value={exercises}>
      {children}
    </ExercisesContext.Provider>
  );
};

export default ExercisesProvider;
