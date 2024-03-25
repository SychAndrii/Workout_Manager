// Use https://www.npmjs.com/package/content-type to create/parse Content-Type headers
import contentType from 'content-type';
import S3 from './data/aws/S3';
import DDB from './data/aws/DynamoDB';

interface Exercise {

}

interface ExerciseData {
  name: string;
  created?: string;
  updated?: string;
  type?: string;
  size: number;
  exerciseType?: string;
  bodypart: string;
  equipment: string;
  gender: string;
  target?: [string];
  synergist?: [string];
  caloriesburnt: number;
}

class Exercise {
  name: string;
  created?: string;
  updated?: string;
  type?: string;
  size: number;
  exerciseType?: string;
  bodypart: string;
  equipment: string;
  gender: string;
  target?: [string];
  synergist?: [string];
  caloriesburnt: number;

  constructor({name, created, updated, type, size = 0, exerciseType, bodypart, equipment, gender, target, synergist, caloriesburnt}: ExerciseData) {
    if (!name) {
      throw new Error('Name property is missing.');
    }

    if (!type) {
      throw new Error('Content-Type property is missing.');
    }

    if (!created && !updated) {
      created = new Date().toISOString();
      updated = new Date().toISOString();
    }

    if (size < 0) {
      throw new Error('Size cannot be negative.');
    }

    if (!bodypart) {
      throw new Error('Bodypart is missing');
    }

    if (!equipment) {
      throw new Error('Equipment is missing');
    }

    if (!gender) {
      throw new Error('Gender is missing');
    }

    const parsedType = contentType.parse(type);

    if (!Exercise.isSupportedType(parsedType.type)) {
      throw new Error(`Invalid Content-Type: ${type}`);
    }

    this.name = name;
    this.created = created;
    this.updated = updated;
    this.type = type;
    this.size = size;
    this.exerciseType = exerciseType;
    this.bodypart = bodypart;
    this.equipment = equipment;
    this.gender = gender;
    this.target = target;
    this.synergist = synergist;
    this.caloriesburnt = caloriesburnt;
  }

  /**
   * Delete the exercise data and metadata for the given id.
   * @param {string} exerciseName - Name of the exercise, retrieved through query parameter.
   * @param {string} fileType - Type of file, also retrieved through query parameter.
   * @return {Promise<void>} A promise that resolves when the deletion is complete.
   */
  static deleteData(exerciseName: string, fileType: string): Promise<void> {
    return Promise.resolve(S3.deleteObject(exerciseName, fileType));
  }

  /**
   * Gets the Exercise's data from the database.
   * @param {string} fileType - Type of file, retrieved through query parameter.
   * @return {Promise<{presignedUrl: any}>} A promise resolving to the data buffer.
   */
  async getData(fileType: string): Promise<{presignedUrl: any}> {
    const data = await S3.getObject(this.name, fileType);
    if (!data) {
      throw new Error('No data retrieved.');
    }
    return data;
  }

  /**
   * Sets the Exercise's data in the database.
   * @param {Buffer} data - The data to set.
   * @return {Promise<void>} A promise that resolves when the operation is complete.
   */
  async setData(data: Buffer): Promise<void> {
    await S3.addImage(this.name, data);
    this.size = Buffer.byteLength(data);
  }

  /**
   * Sets the Exercise's video data in the database.
   * @param {Buffer} data - The video data to set.
   * @return {Promise<void>} A promise that resolves when the operation is complete.
   */
  async setVideo(data: Buffer): Promise<void> {
    await S3.addVideo(this.name, data);
    this.size = Buffer.byteLength(data);
  }

  /**
   * Checks if the content type is supported.
   * @param {string} value - A Content-Type value (e.g., 'text/plain').
   * @return {boolean} True if the content type is supported.
   */
  static isSupportedType(value: string): boolean {
    const supportedTypes = [
      'text/plain',
      'text/markdown',
      'text/html',
      'application/json',
      'image/png',
      'image/jpeg',
      'image/webp',
      'image/gif',
      'application/octet-stream',
    ];

    const typeWithoutCharset = value.split(';')[0].trim();
    return supportedTypes.includes(typeWithoutCharset);
  }


  /**
   * Adds the exercise to the database
   * @returns Promise<void>
   * @throws {Error} if the exercise cannot be added
   */

  async addExercise(): Promise<void> {
    await DDB.addExercise(this);

    return;
  }

  /**
   * Retrieves the exercise from the database
   * @param {name} name of the exercise
   * @throws {Error} if no exercise was retrieved
   * @return {Exercise} object
   */
  static async getExercise(name: string): Promise<Exercise> {
    const exercise = await DDB.getExercise(name);

    if (!exercise) {
      throw new Error('No exercise retrieved.');
    }
    return Promise.resolve(exercise as Exercise);
  }

  /**
   * Retrieves the exercise from the database
   * @throws {Error} if no exercise was retrieved
   * @return {Exercise[]} object
   */
  static async getAllExercises(): Promise<Exercise[]> {
    const exercises = await DDB.getAllExercises();

    if (!exercises) {
      throw new Error('No exercise retrieved.');
    }
    return Promise.resolve(exercises as Exercise[]);
  }

  /**
   * Delete the exercise data and metadata for the given id
   * @param {string} name name of the exercise
   * all retrieved through query parameter
   * @return {Promise<void>} A promise that resolves when the deletion is complete
   */
  static async deleteExercise(name: string): Promise<void> {
    return Promise.resolve(DDB.deleteExercise(name));
  }
}

export default Exercise;
