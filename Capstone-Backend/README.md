# Capstone-Backend

This is the official documentation of the Capstone-Backend (Agility) project for **GROUP02**.

## Table of Contents

| **Section**                               |
| ----------------------------------------- |
| **[CI](#ci)**                             |
| **[CD](#cd)**                             |
| **[API](#api)**                           |
| **[Authentication](#authentication)**     |
| **[Scripts](#scripts)**                   |
| **[Database Classes](#database-classes)** |
| **[Testing](#testing)**                   |
| **[Dependencies](#dependencies)**         |

## CI

Continuous Integration has been set up for the Agility backend service. It builds the service, lints the code using eslint from Google, tests it with jest unit tests and hurl integration tests.

## CD

Continuous Delivery and Continuous Deployment have been set up for the Agility backend service. It deploys the service to the cloud and is only triggered if CI is successful and changes are pushed to the main branch.

### Continuous Delivery

For Continuous Delivery, the Agility backend service is being dockerized, to create an image that is sent to the AWS Elastic Container Registry. The Docker file has been written adhering to the best practices, ensuring setting up multiple layers (for caching) and only copying the necessary files for the backend service to run, minimizing the docker image file.

### Continuous Deployment

For Continuous Deployment, a task definition has been created for the Agility backend service, after the Docker image is uploaded to AWS ECR, the task definition is send to AWS Elastic Container Service. Where an ECS cluster runs a service that uses a load balancer to run the Agility backend service.

## Authentication

**AWS Cognito** is a comprehensive user identity and access management service that facilitates secure user sign-up, sign-in, and access control to web and mobile applications. We selected **Cognito** for its seamless integration with the AWS ecosystem, robust security features such as multi-factor authentication, and the ability to scale effortlessly with user growth, making it an ideal choice for managing authentication in our project.

## API

```javascript
// Route to add User
// Accepts in Request body:
// {
//   "email": string,
//   "data": {
//     "username": string,
//     "weight": number,
//     "age": number,
//     "height": number,
//     "gender": string
// }
// /api/user
router.post("/", addUser);

// Route to check if user exists
// Accepts in Query string:
// email: string
// Returns:
// 200 if user exists
// 404 if user does not exist
// /api/user/exists
router.get("/exists", userExists);

// Health Check route
router.get("/", healthcheck);

// Health Check Route for authenticated users
router.get("/secureHealth", authenticate(), healthcheck);

/* Retrieves all exercise objects stored in S3 Bucket and DynamoDB Table
 * Retrieves an array of objects containing presigned URLs for the image and video, and the exercise metadata
 */
router.get("/exercise/all", getAllExercises);

/* Creates an exercise object
 * Stores a file to the S3 Bucket and metadata to the DynamoDB Table
 * Required queries:
 * name = exercise name
 * bodypart = targetted body part
 * equipment = equipment (if needed)
 * caloriesburnt = calories burned by the exercise
 * type = fileType (img or Video)
 */
router.post("/exercise", rawBody(), addExercise);

/* Deletes an exercise object from S3 Bucket and metadata from DynamoDB
 *
 * Required queries:
 * name = exercise name
 * id = exercise name
 * type = fileType (img or Video)
 */
router.delete("/exercise", deleteExcersise);
```

## Scripts

Many scripts have been made to help make the development process seamless:

### "start"

This script starts the server using Nodemon, so that whenever the developer saves a source file, the server reboots to apply the changes automatically.

### "test:unit"

This script runs all the unit tests.

### "test:unit:watch"

This script runs all the unit tests every time the developer saves a source file.

### "test:unit:coverage"

This script runs all the unit tests and creates a coverage table showcasing the files and the lines of code in these files that have been covered with the unit tests.

### "test:integration"

This script runs all the integration tests given that the server is up and running.

### "lint"

This script checks for code style errors in all source files and tries to fix them.

### "build"

This script builds javascript files out of typescript files. It ensures that there are no syntax errors in code.

## Database classes

### AWS S3 and DynamoDB

Methods:

- `addExercise` : Use this method to add an Exercise object to S3 bucket and metadata to DynamoDB Table **exercise**.
- `getExercise` : Use this method to retrieve an Exercise object to S3 bucket and metadata to DynamoDB Table **exercise**.
- `getAllExercises` : Use this method to retrieve all object from S3 bucket and metadata from DynamoDB Table **exercise**.
- `deleteExercise` : Use this method to remove an Exercise object from S3 bucket and DynamoDB Table **exercise**.

## Testing

### Unit Testing

For unit testing, the jest framework is being used, all unit tests are placed in src/test/unit.

### Integration Testing

For integration testing, hurl is being used, all integration tests are placed in src/test/integration.

### Local Testing
For local testing, a local s3, local dynamodb, and basic authentication are used to allow for testing with mock AWS services and testing routes that require authentication.

## Dependencies

### Dev-Dependencies

```json
{
  "@orangeopensource/hurl": "^4.2.0",
  "@types/body-parser": "^1.19.5",
  "@types/compression": "^1.7.5",
  "@types/content-type": "^1.1.8",
  "@types/cors": "^2.8.17",
  "@types/express": "^4.17.21",
  "@types/jest": "^29.5.11",
  "@types/passport": "^1.0.16",
  "@types/passport-http-bearer": "^1.0.41",
  "@types/stoppable": "^1.1.3",
  "@typescript-eslint/eslint-plugin": "^6.21.0",
  "@typescript-eslint/parser": "^6.21.0",
  "eslint": "^8.56.0",
  "eslint-config-google": "^0.14.0",
  "eslint-plugin-import": "^2.29.1",
  "eslint-plugin-n": "^15.7.0",
  "eslint-plugin-promise": "^6.1.1",
  "jest": "^29.7.0",
  "nodemon": "^3.0.3",
  "passport": "^0.7.0",
  "passport-http-bearer": "^1.0.1",
  "ts-jest": "^29.1.2",
  "ts-node": "^10.9.2",
  "typescript": "^5.3.3"
}
```

### Dependencies

```json
{
  "@aws-sdk/client-dynamodb": "^3.506.0",
  "@aws-sdk/client-s3": "^3.504.0",
  "@aws-sdk/lib-dynamodb": "^3.506.0",
  "@aws-sdk/s3-request-presigner": "^3.504.0",
  "aws-jwt-verify": "^4.0.0",
  "body-parser": "^1.20.2",
  "compression": "^1.7.4",
  "cors": "^2.8.5",
  "dotenv": "^16.4.1",
  "express": "^4.18.2",
  "helmet": "^7.1.0",
  "pino": "^8.18.0",
  "pino-http": "^9.0.0",
  "pino-pretty": "^10.3.1",
  "stoppable": "^1.1.0",
  "supertest": "^6.3.4"
}
```
