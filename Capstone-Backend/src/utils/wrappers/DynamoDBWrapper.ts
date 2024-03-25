import {
  PutCommand,
  PutCommandOutput,
  DeleteCommand,
  GetCommand,
  ScanCommand,
  ScanCommandInput
} from "@aws-sdk/lib-dynamodb";
import ddbDocClient from "../../model/data/aws/DynamoDB/ddbClient";

/**
 * A wrapper class around AWS SDK's DynamoDB DocumentClient to simplify
 * interactions with DynamoDB, providing methods to perform common operations
 * such as creating, updating, deleting, and fetching items.
 */
class DynamoDBWrapper {
  private tableName: string;

  /**
   * Constructs a DynamoDBWrapper instance for a specific DynamoDB table.
   *
   * @param {string} tableName - The name of the DynamoDB table to interact with.
   */
  public constructor(tableName: string) {
    this.tableName = tableName;
  }

  /**
   * Inserts or updates an item in the specified DynamoDB table.
   *
   * @param {any} item - The item to insert or update in the DynamoDB table.
   * @return {Promise<PutCommandOutput>} A promise that resolves with the result of the Put operation.
   */
  public async updateItem(item: any): Promise<PutCommandOutput> {
    const metaDataParams = {
      TableName: this.tableName,
      Item: item,
    };

    // Create a PUT command to send to DynamoDB
    const metadataCommand = new PutCommand(metaDataParams);
    return ddbDocClient.send(metadataCommand);
  }

  /**
   * Removes an item identified by its key from the specified DynamoDB table.
   *
   * @param {string} key - The key of the item to remove.
   */
  public async removeItem(key: string) {
    // Configure our DELETE params, with the name of the table and key (partition key)
    const params = {
      TableName: this.tableName,
      Key: { name: key },
    };

    // Create a delete command to send to DynamoDB
    const commandDDB = new DeleteCommand(params);
    // Use our client to send the command
    await ddbDocClient.send(commandDDB);
  }

  /**
   * Retrieves an item by its key from the specified DynamoDB table.
   *
   * @param {string} keyName - The name of the key attribute to query.
   * @param {string} keyValue - The value of the key attribute to query for.
   * @return {Promise<T | null>} A promise that resolves with the fetched item or null if the item does not exist.
   */
  public async getItem<T>(keyName: string, keyValue: string) {
    const params = {
      TableName: this.tableName,
      Key: { [keyName]: keyValue },
    };

    // Create a GET command to send to DynamoDB
    const command = new GetCommand(params);

    // Wait for the data to come back from AWS
    const data = await ddbDocClient.send(command);
    const item = data?.Item;

    if (!item) {
      return null;
    }

    return item as T;
  }

  /**
   * Fetches items from the DynamoDB table. If conditions are provided, it fetches items that match those conditions.
   * If no conditions are provided, it fetches all items.
   *
   * @param {Record<string, any>?} conditions - Optional. A record object where the keys are column names and the values are the expected column values.
   * @return {Promise<T[]>} A promise that resolves with an array of items that match the conditions, or all items if no conditions are specified.
   */
  public async getItems<T>(conditions?: Record<string, any>): Promise<T[]> {
    const params: ScanCommandInput = {
      TableName: this.tableName,
    };

    if (conditions && Object.keys(conditions).length > 0) {
      const filterExpressions: string[] = [];
      const expressionAttributeValues: Record<string, any> = {};
      Object.keys(conditions).forEach((key, index) => {
        const attributeValueKey = `:value${index}`;
        filterExpressions.push(`${key} = ${attributeValueKey}`);
        expressionAttributeValues[attributeValueKey] = conditions[key];
      });

      params.FilterExpression = filterExpressions.join(' AND ');
      params.ExpressionAttributeValues = expressionAttributeValues;
    }

    // Create a SCAN command to send to DynamoDB
    const command = new ScanCommand(params);

    // Wait for the data to come back from AWS
    const data = await ddbDocClient.send(command);
    const items = data?.Items;

    return items ? (items as T[]) : [];
  }
}

export default DynamoDBWrapper;
