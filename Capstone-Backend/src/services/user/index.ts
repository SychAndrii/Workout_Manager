import DynamoDBWrapper from "../../utils/wrappers/DynamoDBWrapper";
import IUserService from "./IUserService";
import AWSUserServiceAdapter from "./aws/AWSUserServiceAdapter";

// Don't ask me why it's here
// Ask dotenv developers why their stupid package
// can't locate environment variables in this file
import dotenv from "dotenv";
dotenv.config();

const dynamoDBWrapper = new DynamoDBWrapper(process.env.AWS_DYNAMODB_USERS as string);

const UserService: IUserService = new AWSUserServiceAdapter(dynamoDBWrapper);

export default UserService;
