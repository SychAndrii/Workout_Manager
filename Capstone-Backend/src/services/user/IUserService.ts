import { IUserData } from "../../model/user";

/**
 * Interface for a service that manages user-related operations, providing
 * methods to check for the existence of a username and retrieve user data by email.
 */
interface IUserService {
  /**
   * Checks whether a given username already exists within the system.
   *
   * @param {string} username - The username to check for existence.
   * @returns {Promise<boolean>} A promise that resolves with a boolean indicating whether the username exists.
   */
  usernameExists(username: string): Promise<boolean>;

  /**
   * Retrieves user data based on the provided email address.
   *
   * @param {string} email - The email address to use for retrieving user data.
   * @returns {Promise<IUserData>} A promise that resolves with the user data associated with the given email.
   */
  getUserByEmail(email: string): Promise<IUserData>;
}

export default IUserService;
