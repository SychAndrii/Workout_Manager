import DynamoDBWrapper from "../../utils/wrappers/DynamoDBWrapper";
import S3Wrapper from "../../utils/wrappers/S3Wrapper";
import IExerciseService from "./IExerciseService";
import AWSExerciseService from "./aws/AWSExerciseService";

// Don't ask me why it's here
// Ask dotenv developers why their stupid package
// can't locate environment variables in this file
import dotenv from "dotenv";
dotenv.config();

const dynamoDBWrapper = new DynamoDBWrapper(
  process.env.AWS_DYNAMODB_EXERCISES as string
);

const s3Wrapper = new S3Wrapper(process.env.AWS_S3_BUCKET_NAME as string);

const ExerciseService: IExerciseService = new AWSExerciseService(
  dynamoDBWrapper,
  s3Wrapper
);

export default ExerciseService;
