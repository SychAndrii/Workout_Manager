"use client";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useState, useEffect } from "react";
import awsconfig from "@/aws/aws-exports";
import { fetchAuthSession } from "aws-amplify/auth";
import { LogoutContext, UserContext } from "../context/data";
import EnterData from "./EnterData";
import { UserProfileContext } from "../context/data";

Amplify.configure(awsconfig);
/**
 * `AuthGuard` is a component that provides authentication functionality throughout the application.
 * It ensures that child components are only rendered if the user is authenticated.
 * It utilizes AWS Amplify for authentication and session management.
 *
 * @component
 * @param {Object} props - The props object.
 * @param {React.ReactNode} props.children - The child components to render inside the `AuthGuard`.
 * @returns {React.ReactElement} - A React element wrapping the Authenticator component from AWS Amplify,
 *                                  providing an authentication gate for child components.
 */

/**
 * Retrieves the current user's email from the AWS Amplify Auth session.
 * @returns {Promise<string>} - A promise that resolves to the user's email.
 */
async function userEmail() {
  try {
    const session = await fetchAuthSession();
    const { idToken } = session.tokens ?? {};

    return idToken;
  } catch (err) {
    console.log(err);
  }
}

/**
 * Checks if the current user's email exists in the database or not.
 * @returns {Promise<boolean>} - A promise that resolves to a boolean value indicating whether the user's email exists.
 */
async function doesUserExist() {
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API || "http://localhost:80/";
  try {
    // Get the current user from AWS Amplify Auth
    const token = await userEmail();

    const response = await fetch(
      `${apiUrl}api/user/exists?email=${token.payload.email}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 404) {
      return false;
    }
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

const AuthGuard = ({ children }) => {
  return (
    <div className="items-center justify-center h-screen m-3">
      <div>
        <Authenticator>
          {({ signOut, user }) => (
            <LoggedInContent
              children={children}
              loggedInUser={user}
              signOut={signOut}
            />
          )}
        </Authenticator>
      </div>
    </div>
  );
};

/**
 * `LoggedInContent` is a component that manages the state of the logged-in user and wraps the children
 * components with user context and logout functionality, enabling work of useUser and useLogout hooks.
 * It fetches and includes the user's ID token in the user object provided to child components.
 *
 * @component
 * @param {Object} props - The props object for LoggedInContent component.
 * @param {React.ReactNode} props.children - The child components to render inside the LoggedInContent.
 * @param {Object} props.loggedInUser - The user object obtained from the Authenticator component, representing the currently logged-in user.
 * @param {Function} props.signOut - The signOut function provided by the Authenticator component to log out the user.
 * @returns {React.ReactElement | null} - A React element providing user and logout context to child components, or null if the user state is not set.
 */
const LoggedInContent = ({ children, loggedInUser, signOut }) => {
  const [user, setUser] = useState(null);
  const [userProfileData, setUserProfileData] = useState(null);

  const [ddBExists, setddBExists] = useState(null);

  async function addToken() {
    try {
      const session = await fetchAuthSession();
      const { idToken } = session.tokens ?? {};
      setUser({
        ...loggedInUser,
        idToken,
      });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (loggedInUser) addToken();
  }, [loggedInUser]);

  useEffect(() => {
    async function checkDataAndRedirect() {
      console.log(user);
      const userExists = await doesUserExist(user.idToken); // Assume doesUserExist handles errors and returns a boolean
      setddBExists(userExists);

      if (!userExists) {
        console.log("User does not exist on DDB");
      } else {
        const apiUrl =
          process.env.NEXT_PUBLIC_BACKEND_API || "http://localhost:80/";
        const res = await fetch(
          `${apiUrl}api/user/${user.idToken.payload.email}`,
          {
            headers: new Headers({
              Authorization: `Bearer ${user.idToken}`,
            }),
          }
        );
        const json = await res.json();
        setUserProfileData(json);
      }
    }

    if (user) checkDataAndRedirect();
  }, [user]);

  const loggedInButWithoutFitnessData = !ddBExists && user;
  const loggedInWithFitnessData = ddBExists && user;
  const loggedIn = user;

  // Conditional rendering based on user state and fetched data
  return (
    loggedIn &&
    ddBExists !== null && (
      <>
        <LogoutContext.Provider value={signOut}>
          <UserProfileContext.Provider value={userProfileData}>
            {loggedInButWithoutFitnessData && <EnterData />}
            {loggedInWithFitnessData && userProfileData && children}
          </UserProfileContext.Provider>
        </LogoutContext.Provider>
      </>
    )
  );

  // return (
  //   user && (
  //     <>
  //       <LogoutContext.Provider value={signOut}>
  //         <UserContext.Provider value={user}>
  //           {children}
  //         </UserContext.Provider>
  //       </LogoutContext.Provider>
  //     </>
  //   )
  // );
};

export default AuthGuard;
