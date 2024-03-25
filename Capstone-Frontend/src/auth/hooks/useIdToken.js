'use client';
import { useEffect, useState } from 'react'
import { fetchAuthSession } from 'aws-amplify/auth';

/**
 * Custom hook for retrieving and providing an ID token from the current authentication session.
 * This hook uses AWS Amplify's fetchAuthSession to obtain the authentication session
 * and extract the ID token, storing it in the component's state.
 *
 * Usage:
 * This hook can be used in any component that requires access to the ID token
 * associated with the current user's session. By invoking this hook, components can get
 * the ID token directly without handling the fetch logic themselves.
 *
 * Example:
 *
 * import useIdToken from 'path/to/useIdToken';
 *
 * const MyComponent = () => {
 *   const idToken = useIdToken();
 *
 *   // Use the ID token for authorized requests or other authentication-dependent logic.
 *   useEffect(() => {
 *     if (idToken) {
 *       console.log('ID Token is available: ', idToken);
 *     }
 *   }, [idToken]);
 *
 *   return <div>{idToken ? 'Token is available' : 'Fetching token...'}</div>;
 * };
 *
 * This hook initializes the token state to null and updates it once the ID token is fetched.
 * If there's no session or token available, the hook maintains the token state as null.
 * Ensure that components using this hook account for the possibility of a null token,
 * especially before performing operations that require a valid token.
 */
const useIdToken = () => {
    const [token, setToken] = useState(null);

    useEffect(() => {
        async function fetchToken() {
            const session = await fetchAuthSession();
            const { idToken } = session.tokens ?? {};
            setToken(idToken);
        }
        fetchToken();
    }, []);

   return token;
}

export default useIdToken;
