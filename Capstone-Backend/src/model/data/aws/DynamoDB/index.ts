// src/model/data/aws/DynamoDB/index.ts

import Exercise from '../../../exercise';
import User from '../../../user';
import ddbDocClient from './ddbClient';
import {
  PutCommand,
  GetCommand,
  DeleteCommand,
  ScanCommand,
} from '@aws-sdk/lib-dynamodb';
// import logger from '../../../logger';

export default class DynamoDB {
  /**
   * Checks if an email exists in DynamoDB
   *
   * @param {string} email
   * @return {Promise<boolean>} true if the email exists, false otherwise
   */
  static async emailExists(email: string) {
    const params = {
      TableName: process.env.AWS_DYNAMODB_USERS,
      Key: {
        email: email,
      },
    };

    try {
      const data = await ddbDocClient.send(new GetCommand(params));
      // If the item is found, data.Item will not be undefined
      return !!data.Item;
    } catch (err: any) {
      throw new Error(`Error checking email existence: ${err.message}`);
    }
  }

  /**
   * Checks if a username exists in DynamoDB
   *
   * @param {string} username
   * @return {Promise<boolean>} true if the username exists, false otherwise
   */
  static async usernameExists(username: string) {
    const scanParams = {
      TableName: process.env.AWS_DYNAMODB_USERS,
      FilterExpression: '#userData.username = :username',
      ExpressionAttributeNames: {
        '#userData': 'data', // Use an expression attribute name to avoid reserved keyword conflict
      },
      ExpressionAttributeValues: {
        ':username': username,
      },
    };

    try {
      const data = await ddbDocClient.send(new ScanCommand(scanParams));
      return data.Items && data.Items.length > 0;
    } catch (err: any) {
      throw new Error(`Error checking username existence: ${err.message}`);
    }
  }

  /**
   * Adds userData to DynamoDB
   *
   * @param {User} user userData
   * @return {Promise<void>}
   * @throws {Error} if userData can't be added to DynamoDB
   * @throws {Error} if username already exists
   */
  static async addUser(user: User) {
    // Check if the username already exists
    const exists = await DynamoDB.usernameExists(user.data.username);
    if (exists) {
      throw new Error('Username already exists');
    }

    const params = {
      TableName: process.env.AWS_DYNAMODB_USERS,
      Item: user,
    };

    const command = new PutCommand(params);

    try {
      return ddbDocClient.send(command);
    } catch (err: any) {
      throw new Error(`unable to write user info to DynamoDB ${err.message}`);
    }
  }

  // Writes an exercise to DynamoDB. Returns a Promise
  // https://github.com/awsdocs/aws-sdk-for-javascript-v3/blob/main/doc_source/javascript_dynamodb_code_examples.md
  static async addExercise(exercise: Exercise) {
    // Configure our PUT params, with the name of the table and item (attributes and keys)
    const params = {
      TableName: process.env.AWS_DYNAMODB_EXERCISES,
      Item: exercise,
    };

    // Create a PUT command to send to DynamoDB
    const command = new PutCommand(params);

    try {
      return ddbDocClient.send(command);
    } catch (err: any) {
      // const {TableName, Item} = params;
      // logger.warn({ err, TableName, Item }, 'error writing exercise info to DynamoDB');
      throw new Error(
          `unable to write exercise info to DynamoDB ${err.message}`,
      );
    }
  }

  // Reads an exercise from DynamoDB. Returns a Promise<Exercise|undefined>
  // https://github.com/awsdocs/aws-sdk-for-javascript-v3/blob/main/doc_source/javascript_dynamodb_code_examples.md
  static async getExercise(name: string) {
    // Configure our GET params, with the name of the table and key (partition key)
    const params = {
      TableName: process.env.AWS_DYNAMODB_EXERCISES,
      Key: {name},
    };

    // Create a GET command to send to DynamoDB
    const command = new GetCommand(params);

    try {
      // Wait for the data to come back from AWS
      const data = await ddbDocClient.send(command);
      // We may or may not get back any data (e.g., no item found for the given key).
      // If we get back an item (exercise), we'll return it.  Otherwise we'll return `undefined`.
      return data?.Item;
    } catch (err: any) {
      // const {TableName, Key} = params;
      // logger.warn({ err, TableName, Key }, 'error retrieving exercise information from DynamoDB');
      throw new Error(
          `unable to retrieve exercise info from DynamoDB ${err.message}`,
      );
    }
  }

  static async getAllExercises() {
    const params = {
      TableName: process.env.AWS_DYNAMODB_EXERCISES,
    };

    // Create a SCAN command to send to DynamoDB
    const command = new ScanCommand(params);

    try {
      // Wait for the data to come back from AWS
      const data = await ddbDocClient.send(command);
      // The Scan operation returns items in an array called Items.
      // We'll return this array. If it's empty, this means no items were found.
      return data?.Items; // May return an empty array if no items are found
    } catch (err: any) {
      // logger.warn({ err, TableName: params.TableName }, 'error retrieving all exercises from DynamoDB');
      throw new Error(
          `unable to retrieve all exercises from DynamoDB ${err.message}`,
      );
    }
  }
  // Deletes an Exercise's data from a Table
  // https://github.com/awsdocs/aws-sdk-for-javascript-v3/blob/main/doc_source/javascript_dynamodb_code_examples.md
  static async deleteExercise(name: string) {
    // Delete an Exercise info from dynamodb

    // Configure our DELETE params, with the name of the table and key (partition key)
    const params = {
      TableName: process.env.AWS_DYNAMODB_EXERCISES,
      Key: {name},
    };

    // Create a delete command to send to DynamoDB
    const commandDDB = new DeleteCommand(params);

    try {
      // Use our client to send the command
      await ddbDocClient.send(commandDDB);
    } catch (err: any) {
      // const {TableName, Key} = params;
      // logger.warn({ err, TableName, Key }, 'error retrieving exercise information from DynamoDB');
      throw new Error(
          `unable to retrieve exercise info from DynamoDB ${err.message}`,
      );
    }
  }
}
