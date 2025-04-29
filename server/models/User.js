const { GetCommand, PutCommand, UpdateCommand } = require("@aws-sdk/lib-dynamodb");
const dynamo = require("../config/dynamo");

const TABLE_NAME = "Users"; 

exports.createUser = async (userData) => {
  return await dynamo.send(new PutCommand({
    TableName: TABLE_NAME,
    Item: userData
  }));
};

exports.getUserByEmail = async (email) => {
  return await dynamo.send(new GetCommand({
    TableName: TABLE_NAME,
    Key: { email } 
  }));
};

exports.updateUserFavorites = async (email, newFavorites) => {
  return await dynamo.send(new UpdateCommand({
    TableName: TABLE_NAME,
    Key: { email },
    UpdateExpression: "set favorites = :favs",
    ExpressionAttributeValues: {
      ":favs": newFavorites
    }
  }));
};
