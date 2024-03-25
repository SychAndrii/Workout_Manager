# Original repositories

[Backend](https://github.com/Mounayer/Capstone-Backend/tree/main)
[Frontend](https://github.com/aamfahim/Capstone-Frontend/tree/main)
[Main Repository](https://github.com/BTS-2023-2024/Group_02)

# Developers

| Name                    | Role           | Github                                        | Email                      |
| ----------------------- | -------------- | --------------------------------------------- | -------------------------- |
| Abdullah Al Mamun Fahim | Full Stack Dev | [aamfahim](https://github.com/aamfahim)       | aamfahim@myseneca.ca       |
| Andrii Sych             | Full Stack Dev | [SychAndrii](https://github.com/SychAndrii)   | asych@myseneca.ca          |
| Cleo Buenaventura       | Full Stack Dev | [cleobnvntra](https://github.com/cleobnvntra) | cjbuenaventura@myseneca.ca |
| Majd Al Mnayer          | Full Stack Dev | [Mounayer](https://github.com/Mounayer)       | mal-mnayer@myseneca.ca     |

# Working Agreement

Working agreement can be found [here](https://github.com/BTS-2023-2024/Group_02/blob/main/wa.md)

# Definition of Done

Definition of done can be found [here](https://github.com/BTS-2023-2024/Group_02/blob/main/dod.md)

# Work Breakdown Structure

WBS of Agility that contains 100% of the work to be done can be found [here](https://github.com/BTS-2023-2024/Group_02/blob/main/Agility_WBS.png)

# Project Description

Agility is an innovative web application designed to revolutionize the way individuals track and share their fitness journeys. Catering to a wide range of activities, including running, weightlifting, and general training, Agility.com offers a dynamic platform for fitness enthusiasts of all levels. Users can easily log their workouts, set goals, and monitor their progress over time. The application emphasizes community interaction, allowing users to share their achievements and routines with others, fostering a motivating and supportive environment. Tailored to both novices and seasoned athletes, Agility.com combines cutting-edge technology with user-friendly design to create an engaging and comprehensive fitness experience. The platform not only tracks physical progress but also encourages a holistic approach to health and wellness, bridging the gap between physical training and a balanced lifestyle.

## Highlighted Features

### Account Management

Users will be able to create, update, view, and delete account information such as name, age, gender, email and password.

### Workout Management

Users will have the capability to personalize their daily workout schedules. They can add their preferred workouts, create custom exercises, view the duration required for each workout, ascertain the calorie burn of each exercise or workout, and log their workout history in a calendar.

### Exercise Management

Users will have the ability to determine the calorie burn amount for each exercise, view instructional videos to learn proper exercise execution techniques, search for exercises targeting specific muscle groups, add their favorite exercises, view the level of difficulty of each exercise, and record their exercise history in a calendar.

### Community and Sharing

Users will have the option to share their personalized workout routines, making them publicly accessible to other users. Additionally, they will be able to view workout routines shared by others and rate these routines based on their effectiveness and preference.

### Fitness Tracking and Goals

Users will be able to enter their current weight and set a target weight goal. Upon achieving this goal, they will receive a congratulatory message along with a celebratory sound. Furthermore, users will have access to a calendar feature that tracks their activity within the app, providing a comprehensive view of their progress.

### Adaptive Workout

Users will be able to opt for an automatic progressive overload feature in their workout routine, which incrementally increases the intensity as they advance through the exercises. They will also have the option to select alternative workout plans, targeting the same muscle group, to diversify their training regimen. Additionally, users will receive personalized workout suggestions tailored to their specific goals. Moreover, there will be an option to choose from pre-designed workouts that target all body parts, catering to a comprehensive fitness approach.

# Technological Stack

The proposed solution for the web app for tracking and sharing training incorporates a range of technologies to ensure a seamless and robust user experience. On the frontend, we plan to utilize the Next.js framework, which offers server-side rendering for improved performance and SEO, along with the Tailwind CSS framework to create a modern and responsive design. For user authentication and authorization, AWS Cognito will be integrated to ensure secure user access. The search functionality will be powered by fuse.js, enabling users to efficiently search and find relevant training information. On the backend, the application will rely on AWS S3 for file storage, NodeJS as the runtime environment, and Express as the web framework for handling HTTP requests and routes. AWS Cognito will again be employed for authorization on the server-side. To manage data, AWS DynamoDB, a NoSQL database, will be used to store and retrieve user training information. This comprehensive technology stack will enable us to deliver a feature-rich and user-friendly web app for tracking and sharing training activities.

### Continuous Integration / Testing

We will be using Jest for unit testing and Hurl for integration testing in the Back-end:

- Unit Testing : [Jest](https://jestjs.io/)
- Integration Testing: [Hurl](https://hurl.dev/)

For **Continuous Integration**, it will only allow CD to start if all tests pass in the CI workflow.

### Continuous Delivery / Deployment

For **Continuous Delivery**, we will be using [Docker](https://www.docker.com/) to create a Docker image out of the Back-end service, and [AWS ECR](https://aws.amazon.com/ecr/) to store the Docker image. The Docker image will be built using the CD workflow.

For **Continuous Deployment**, we are using [AWS ECS](https://aws.amazon.com/ecs/) to create a service that runs a load balancer where our Back-end service is hosted.

### Frontend

We will be using JavaScript as our Frontend programming language.

- React Framework: [Next.js](https://nextjs.org/)
- CSS Framework: [Tailwind](https://tailwindcss.com/)
- Authentication/Authorization: [AWS Cognito](https://aws.amazon.com/cognito/)
- Search Functionality: [fuse.js](https://www.fusejs.io/)

### Backend

We will be using TypeScript as our Backend programming language.

- Logging tool: [Pino Logger](https://getpino.io/#/)
- Runtime Environment: [NodeJS](https://nodejs.org/en)
- Web Framework: [Express](https://expressjs.com/)
- Authentication/Authorization: [AWS Cognito](https://aws.amazon.com/cognito/)

### Database

The following services will be used on the Back-end to store the data and the metadata:

- Video/Image Storage: [AWS S3](https://aws.amazon.com/s3/)
- Metadata: [AWS DynamoDB](https://aws.amazon.com/dynamodb/)

### Environment Variables

The environment variables required for the **Continuous Delivery** workflow to run will be stored in GitHub secrets.

The sensitive environment variables required for the Back-end service to run on AWS ECS will be stored and encrypted on [AWS Parameter Store](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html) and delivered directly to the Back-end service at runtime.

### Development Tools

This application is developed using [Visual Studio Code](https://code.visualstudio.com/). We will be using [Jest](https://jestjs.io/) for unit-testing and [Hurl](https://hurl.dev/) for integration testing. Additionally, we will follow Test Driven Development methodologies.

### Exercise Video Resources

We will be using royalty-free exercise videos from [Pexels](https://www.pexels.com/). The license allows us to use all of the "Free-To-Use" videos on their platform. There are plenty of exercise videos available on there.
