import DynamoDB from "../../../model/data/aws/DynamoDB";
import IUserService from "../IUserService";
import { IUserData } from "../../../model/user";
import DynamoDBWrapper from "../../../utils/wrappers/DynamoDBWrapper";
import NotFound from "../../../errors/classes/NotFound";
import User from "../../../interfaces/User";

/**
 * AWSUserAdapter is an implementation of the IUserService interface, following the Adapter pattern.
 * It adapts the IUserService interface to work with the DynamoDB utilizing an existing
 * DynamoDB class for specific DynamoDB interactions. This adapter allows the user service logic
 * to interact with DynamoDB through a consistent interface while encapsulating any AWS-specific logic.
 */
class AWSUserAdapter implements IUserService {
    private dynamoDbWrapper: DynamoDBWrapper;

     /**
     * Constructs an AWSUserAdapter instance with a specific DynamoDBWrapper.
     * The DynamoDBWrapper is used to interact with the DynamoDB, abstracting the specifics of
     * database operations and providing a simplified interface.
     *
     * @param {DynamoDBWrapper} dynamoDbWrapper - The DynamoDBWrapper instance for interacting with DynamoDB.
     */
    constructor(dynamoDbWrapper: DynamoDBWrapper) {
        this.dynamoDbWrapper = dynamoDbWrapper;
    }

    /**
     * Checks if a username exists in DynamoDB by leveraging the existing DynamoDB class.
     * This method demonstrates the Adapter pattern by utilizing an existing class within a new context.
     *
     * @param {string} username - The username to check in the database.
     * @return {Promise<boolean>} A promise that resolves with true if the username exists, false otherwise.
     */
    async usernameExists(username: string): Promise<boolean> {
        const res = await DynamoDB.usernameExists(username);
        return !!res;
    }

    /**
     * Retrieves user data from DynamoDB based on the user's email. It uses the DynamoDBWrapper
     * to abstract the retrieval operation and throws a NotFound error if the user cannot be found,
     * demonstrating the Adapter pattern's role in integrating disparate interfaces.
     *
     * @param {string} email - The email address to find the user by.
     * @return {Promise<IUserData>} A promise that resolves with the user data if found.
     * @throws {NotFound} Throws a NotFound error if the user is not found.
     */
    async getUserByEmail(email: string): Promise<IUserData> {
        const user = await this.dynamoDbWrapper.getItem<User>('email', email);
        if (!user) {
            throw new NotFound(`User with specified email does not exist!`);
        }

        return user.data as IUserData;
    }
}

export default AWSUserAdapter;
