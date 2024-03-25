#!/bin/sh

# Setup steps for working with LocalStack and DynamoDB local instead of AWS.
# Assumes aws cli is installed and LocalStack and DynamoDB local are running.

# Setup AWS environment variables
echo "Setting AWS environment variables for LocalStack"

echo "AWS_ACCESS_KEY_ID=test"
export AWS_ACCESS_KEY_ID=test

echo "AWS_SECRET_ACCESS_KEY=test"
export AWS_SECRET_ACCESS_KEY=test

echo "AWS_SESSION_TOKEN=test"
export AWS_SESSION_TOKEN=test

export AWS_DEFAULT_REGION=us-east-1
echo "AWS_DEFAULT_REGION=us-east-1"

# Wait for LocalStack to be ready, by inspecting the response from healthcheck
echo 'Waiting for LocalStack S3...'
until (curl --silent http://localhost:4566/_localstack/health | grep "\"s3\": \"\(running\|available\)\"" > /dev/null); do
    sleep 5
done
echo 'LocalStack S3 Ready'

# Create our S3 bucket with LocalStack
echo "Creating LocalStack S3 bucket: agility-exercises"
aws --endpoint-url=http://localhost:4566 s3api create-bucket --bucket agility-exercises

# Delete preexisting DynamoDB tables if they exist
echo "Deleting preexisting DynamoDB tables..."

aws --endpoint-url=http://localhost:8000 dynamodb delete-table --table-name exercise
aws --endpoint-url=http://localhost:8000 dynamodb wait table-not-exists --table-name exercise

aws --endpoint-url=http://localhost:8000 dynamodb delete-table --table-name user
aws --endpoint-url=http://localhost:8000 dynamodb wait table-not-exists --table-name user

aws --endpoint-url=http://localhost:8000 dynamodb delete-table --table-name workout
aws --endpoint-url=http://localhost:8000 dynamodb wait table-not-exists --table-name workout

echo "Deleted preexisting DynamoDB tables."

# Setup DynamoDB Table with dynamodb-local, see:
# https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/getting-started-step-1.html
echo "Creating DynamoDB-Local DynamoDB table: exercise"
aws --endpoint-url=http://localhost:8000 \
dynamodb create-table \
    --table-name exercise \
    --attribute-definitions \
        AttributeName=name,AttributeType=S \
    --key-schema \
        AttributeName=name,KeyType=HASH \
    --provisioned-throughput \
        ReadCapacityUnits=10,WriteCapacityUnits=5
aws --endpoint-url=http://localhost:8000 dynamodb wait table-exists --table-name exercise

echo "Creating DynamoDB-Local DynamoDB table: user"
aws --endpoint-url=http://localhost:8000 \
dynamodb create-table \
    --table-name user \
    --attribute-definitions \
        AttributeName=email,AttributeType=S \
    --key-schema \
        AttributeName=email,KeyType=HASH \
    --provisioned-throughput \
        ReadCapacityUnits=10,WriteCapacityUnits=5
aws --endpoint-url=http://localhost:8000 dynamodb wait table-exists --table-name user

echo "Creating DynamoDB-Local DynamoDB table: workout"
aws --endpoint-url=http://localhost:8000 \
dynamodb create-table \
    --table-name workout \
    --attribute-definitions \
        AttributeName=id,AttributeType=S \
        AttributeName=username,AttributeType=S \
    --key-schema \
        AttributeName=id,KeyType=HASH \
        AttributeName=username,KeyType=RANGE \
    --provisioned-throughput \
        ReadCapacityUnits=10,WriteCapacityUnits=5
aws --endpoint-url=http://localhost:8000 dynamodb wait table-exists --table-name workout
