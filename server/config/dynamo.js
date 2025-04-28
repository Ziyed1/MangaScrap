const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({
  region: 'eu-west-1'
});

const dynamo = DynamoDBDocumentClient.from(client);

module.exports = dynamo;
