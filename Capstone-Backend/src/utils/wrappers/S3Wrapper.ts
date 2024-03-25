import s3Client from "../../model/data/aws/S3/s3Client";
import {
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

/**
 * A wrapper class around AWS SDK's S3 client to simplify interactions with S3,
 * providing methods to perform common operations such as creating, deleting, and
 * retrieving objects, as well as generating signed URLs for objects.
 */
class S3Wrapper {
  private bucketName: string;

  /**
   * Constructs a S3Wrapper instance for a specific S3 bucket.
   *
   * @param {string} bucketName - The name of the S3 bucket to interact with.
   */
  constructor(bucketName: string) {
    this.bucketName = bucketName;
  }

  /**
 * Uploads an item to the specified S3 bucket.
 *
 * @param {any} item - The item to upload to S3.
 * @param {string} key - The key under which to store the item.
 * @return {Promise<any>} A promise that resolves with the result of the S3 PutObject operation.
 */
async updateItem(item: any, key: string): Promise<any> {
  // Create the PUT API params from our details
  const params = {
    Bucket: this.bucketName,
    Key: key,
    Body: item,
  };

  // Create a PUT Object command to send to S3
  const command = new PutObjectCommand(params);
  return s3Client.send(command);
}

  /**
   * Deletes an item from the specified S3 bucket.
   *
   * @param {string} key - The key of the item to delete from S3.
   * @return {Promise<void>} - A promise that resolves successfully if there are no errors.
   */
  async removeItem(key: string): Promise<void> {
    const s3params = {
      Bucket: this.bucketName,
      Key: key,
    };

    // Create a DELETE Object command to send to S3
    const s3command = new DeleteObjectCommand(s3params);
    await s3Client.send(s3command);
  }

  /**
   * Generates a pre-signed URL for an object stored in S3, allowing temporary access to the object.
   *
   * @param {string} key - The key of the object for which to generate a signed URL.
   * @return {Promise<string>} - A promise that resolves with the generated pre-signed URL.
   */
  public async getSignedURL(key: string): Promise<string> {
    // Create the GET API params from our details
    const itemParams = {
      Bucket: this.bucketName,
      Key: key,
    };

    // Create a GET Object command to send to S3
    const itemCommand = new GetObjectCommand(itemParams);
    // Generate a pre-signed URL for the retrieved object that will expire in 1 hour
    const presignedUrl = await getSignedUrl(s3Client, itemCommand, {
      expiresIn: 3600,
    });

    return presignedUrl;
  }

  /**
   * Checks if an object exists in S3 by attempting to retrieve its metadata.
   *
   * @param {string} key - The key of the object to check for existence.
   * @return {Promise<boolean>} - A promise that resolves with a boolean indicating whether the object exists.
   */
  public async doesSignedURLExist(key: string): Promise<boolean> {
    const params = {
      Bucket: this.bucketName,
      Key: key,
    };

    const s3command = new HeadObjectCommand(params);
    try {
      await s3Client.send(s3command);
      return true; // Object exists
    } catch (err: any) {
      return false;
    }
  }
}

export default S3Wrapper;
