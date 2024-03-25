# Use the specific Node.js version with SHA
FROM node:20.10.0@sha256:8d0f16fe841577f9317ab49011c6d819e1fa81f8d4af7ece7ae0ac815e07ac84 AS dependencies

# Including some metadata
LABEL maintainer="GROUP02" \
    description="Agility Backend"

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

#####################################


# Stage 1: build the service

# Included again if anything changes
FROM node:20.10.0@sha256:8d0f16fe841577f9317ab49011c6d819e1fa81f8d4af7ece7ae0ac815e07ac84 AS build 

# use /app as our working directory
WORKDIR /app

# Copy all dependencies installed in stage 1
COPY --from=dependencies /app /app

# Copy our source code
COPY . .

# replace with npm install --production when launching service
# or npm run build when script is made
RUN npm install

#####################################

# Stage 2: Serve the service

# Your application binds to port 80, so expose this port
EXPOSE 80

# Define the command to run the application
CMD ["npm", "start"]
