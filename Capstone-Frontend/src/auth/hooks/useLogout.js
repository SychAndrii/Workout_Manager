import { useContext } from "react";
import { LogoutContext } from "../context/data";

/**
 * Hook for accessing the logout functionality provided by the LogoutContext.
 * This hook simplifies the process of logging out a user by encapsulating the useContext
 * hook for retrieving the logout function from context.
 * 
 * @returns {Function} The logout function, which can be called to log out the current user.
 * 
 * @example
 * const logout = useLogout();
 * // Call logout() when needed to log out the user
 */
export default function useLogout() {
    return useContext(LogoutContext);
}