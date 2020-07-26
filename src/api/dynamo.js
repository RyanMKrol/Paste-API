import DynamoDBWrapper from 'noodle-dynamo';
import readJsonFile from '../utils';

const dynamoCredentialsLocation = '/credentials/dynamoCredentials.json';

let dynamoDb = null;

async function fetchDynamoClient() {
  if (dynamoDb === null) {
    const dynamoCredentials = await readJsonFile(dynamoCredentialsLocation);
    dynamoDb = new DynamoDBWrapper(dynamoCredentials, 'us-east-2');
  }

  return dynamoDb;
}

export async function storePasteItem(item) {
  const client = await fetchDynamoClient();
  const table = 'Paste';

  return client.writeTable(table, item);
}

export async function removePasteItem(uri) {
  const client = await fetchDynamoClient();

  const table = 'Paste';
  const deleteParams = {
    uri,
  };

  return client.deleteItemFromTable(table, deleteParams);
}

export async function fetchPasteItem(uri) {
  const client = await fetchDynamoClient();

  const table = 'Paste';
  const expression = 'uri = :uri';
  const expressionData = {
    ':uri': uri,
  };

  return client.readTable(table, expression, expressionData);
}
