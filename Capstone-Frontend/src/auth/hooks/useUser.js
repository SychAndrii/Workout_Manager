import { useContext } from "react";
import { UserProfileContext } from "../context/data";

/**
 * Hook for accessing the current user's information stored in the UserProfileContext.
 * This hook makes it easier to access user's data across the application
 * by providing a direct way to access the current user's context.
 *
 * @returns {Object} The current user's information.
 * Contains user details and an ID token.
 *
 * @example
 * const user = useUser();
 * // Use the user object to access user information
 */

export default function useUserProfile() {
  return useContext(UserProfileContext);
}
