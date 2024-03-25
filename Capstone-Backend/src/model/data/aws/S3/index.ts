// src/model/data/index.js
// import logger from '../../../logger';
import s3Client from './s3Client';
import {PutObjectCommand, GetObjectCommand, DeleteObjectCommand, HeadObjectCommand} from '@aws-sdk/client-s3';
import {Readable} from 'stream';
import {getSignedUrl} from '@aws-sdk/s3-request-presigner';


export default class S3 {
  // Writes an Exercise's data to an S3 Object in a Bucket
  // https://github.com/awsdocs/aws-sdk-for-javascript-v3/blob/main/doc_source/s3-example-creating-buckets.md#upload-an-existing-object-to-an-amazon-s3-bucket
  static async addImage(exerciseName: string, data: Buffer) {
    // Create the PUT API params from our details
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      // Key is Exercise and the type of file to be stored to plus the exercise name of the object
      Key: `Exercise/Image/${exerciseName}`,
      Body: data,
    };

    // Create a PUT Object command to send to S3
    const command = new PutObjectCommand(params);

    try {
      // Use our client to send the command
      await s3Client.send(command);
    } catch (err: any) {
      // logger.error({ err, Bucket, Key }, 'Error uploading exercise data to S3');
      throw new Error(`unable to upload image data ${err.message}`);
    }
  }

  static async addVideo(exerciseName: string, data: Buffer) {
    // Create the PUT API params from our details
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      // Key is Exercise and the type of file to be stored to plus the exercise name of the object
      Key: `Exercise/Video/${exerciseName}`,
      Body: data,
    };

    // Create a PUT Object command to send to S3
    const command = new PutObjectCommand(params);

    try {
      // Use our client to send the command
      await s3Client.send(command);
    } catch (err: any) {
      // logger.error({ err, Bucket, Key }, 'Error uploading exercise data to S3');
      throw new Error(`unable to upload video data ${err.message}`);
    }
  }

  // Convert a stream of data into a Buffer, by collecting
  // chunks of data until finished, then assembling them together.
  // We wrap the whole thing in a Promise so it's easier to consume.
  private static streamToBuffer = (stream: Readable) => {
    new Promise((resolve, reject) => {
      // As the data streams in, we'll collect it into an array.
      const chunks: Buffer[] = [];

      // Streams have events that we can listen for and run
      // code.  We need to know when new `data` is available,
      // if there's an `error`, and when we're at the `end`
      // of the stream.

      // When there's data, add the chunk to our chunks list
      stream.on('data', (chunk) => chunks.push(chunk));
      // When there's an error, reject the Promise
      stream.on('error', reject);
      // When the stream is done, resolve with a new Buffer of our chunks
      stream.on('end', () => resolve(Buffer.concat(chunks)));
    });
  };

  // Reads an Exercise's data from S3 and returns (Promise<Buffer>)
  // https://github.com/awsdocs/aws-sdk-for-javascript-v3/blob/main/doc_source/s3-example-creating-buckets.md#getting-a-file-from-an-amazon-s3-bucket
  static async getObject(exerciseName: string, fileType: string) {
    try {
    // Create the PUT API params from our details
      const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        // Key is Exercise and the type of file to be retrieved to plus the exercise name of the object
        Key: `Exercise/${fileType}/${exerciseName}`,
      };

      // Create a GET Object command to send to S3
      const command = new GetObjectCommand(params);

      // Generate a pre-signed URL for the retrieved object that will expire in 1 hour
      const presignedUrl = await getSignedUrl(s3Client, command, {expiresIn: 3600});

      return {presignedUrl};
    } catch (err) {
      throw new Error('Unable to generate pre-signed URL');
    }
  }


  // Reads an Exercise's data from S3 and returns (Promise<Buffer>)
  // https://github.com/awsdocs/aws-sdk-for-javascript-v3/blob/main/doc_source/s3-example-creating-buckets.md#getting-a-file-from-an-amazon-s3-bucket
  static async getAllObject(exerciseName: string) {
    try {
    // Create the GET API params from our details
      const imageParams = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        // Key is Exercise and the type of file to be retrieved to plus the exercise name of the object
        Key: `Exercise/Image/${exerciseName}`,
      };

      // Create a GET Object command to send to S3
      const imageCommand = new GetObjectCommand(imageParams);
      // Generate a pre-signed URL for the retrieved object that will expire in 1 hour
      const presignedImageUrl = await getSignedUrl(s3Client, imageCommand, {expiresIn: 3600});


      // Create the GET API params from our details
      const videoParams = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        // Key is Exercise and the type of file to be retrieved to plus the exercise name of the object
        Key: `Exercise/Video/${exerciseName}`,
      };

      // Create a GET Object command to send to S3
      const videoCommand = new GetObjectCommand(videoParams);
      let presignedVideoUrl = '';

      if (await S3.doesVideoExist(exerciseName)) {
        // Generate a pre-signed URL for the retrieved object that will expire in 1 hour
        presignedVideoUrl = await getSignedUrl(s3Client, videoCommand, {expiresIn: 3600});
      }

      return {Image: presignedImageUrl, Video: presignedVideoUrl};
    } catch (err) {
      throw new Error('Unable to generate pre-signed URL');
    }
  }

  // Delete an exercise's metadata from DynamoDB and data from S3. Returns a Promise
  static async deleteObject(exerciseName: string, fileType: string) {
    const s3params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      // Key is Exercise and the type of file to be deleted to plus the exercise name of the object
      Key: `Exercise/${fileType}/${exerciseName}`,
    };

    // Create a DELETE Object command to send to S3
    const s3command = new DeleteObjectCommand(s3params);

    try {
      // Use our client to send the command
      await s3Client.send(s3command);
    } catch (err) {
      throw new Error('Unable to delete exercise data');
    }
  }


  static async doesVideoExist(exerciseName: string) {
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `Exercise/Video/${exerciseName}`,
    };

    const s3command = new HeadObjectCommand(params);
    try {
      await s3Client.send(s3command);
      return true; // Object exists
    } catch (err:any) {
      if (err.statusCode === 404) {
        return false; // Object does not exist
      }
    }
  }
};
