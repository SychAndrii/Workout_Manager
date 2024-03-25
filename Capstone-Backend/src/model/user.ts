import DDB from './data/aws/DynamoDB';
import logger from '../logger';

export interface IUserData {
  username: string;
  weight: number;
  age: number;
  height: number;
  gender: string;
}

/**
 * User class for CRUD operations on user Data
 */
export default class User {
  email: string;
  data: IUserData;

  /**
   * User constructor
   * @param {string} email Email of the user, key
   * @param {IUserData} data User data
   */
  constructor(email: string, data: IUserData) {
    if (!email) {
      throw new Error('Email property is missing.');
    }
    if (!data) {
      throw new Error('Data property is missing.');
    }
    if (data.age < 0) {
      throw new Error('Age cannot be negative.');
    }
    if (data.height < 0) {
      throw new Error('Height cannot be negative.');
    }
    if (data.weight < 0) {
      throw new Error('Weight cannot be negative.');
    }

    this.email = email;
    this.data = data;
  }

  /**
   * Adds user data to DynamoDB
   * @return {Promise<void>}
   * @throws {Error} if userData can't be added to DynamoDB
   */
  async addUserData(): Promise<void> {
    await DDB.addUser(this);
    logger.info(`User added to DynamoDB: ${this.email}`);
    return;
  }
}
