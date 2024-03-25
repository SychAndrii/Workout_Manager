import DynamoDBWrapper from "../../utils/wrappers/DynamoDBWrapper";
import UserService from "../user";
import ExerciseService from "../exercise";
import IWorkoutService from "./IWorkoutService";
import AWSWorkoutService from "./aws/AWSWorkoutService";

// Don't ask me why it's here
// Ask dotenv developers why their stupid package
// can't locate environment variables in this file
import dotenv from "dotenv";
dotenv.config();

const dynamoDBWrapper = new DynamoDBWrapper(
  process.env.AWS_DYNAMODB_WORKOUTS as string
);

const WorkoutService: IWorkoutService = new AWSWorkoutService(dynamoDBWrapper, UserService, ExerciseService);

export default WorkoutService;
