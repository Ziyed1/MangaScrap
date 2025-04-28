const { GetCommand, PutCommand, ScanCommand } = require("@aws-sdk/lib-dynamodb");
const dynamo = require("../config/dynamo");

const TABLE_NAME = "Mangas";

exports.createManga = async (mangaData) => {
  return await dynamo.send(new PutCommand({
    TableName: TABLE_NAME,
    Item: mangaData
  }));
};

exports.getMangaById = async (mangaId) => {
  const result = await dynamo.send(new GetCommand({
    TableName: TABLE_NAME,
    Key: { mangaId }
  }));
  return result.Item;
};

exports.getAllMangas = async () => {
  const result = await dynamo.send(new ScanCommand({
    TableName: TABLE_NAME,
  }));
  return result.Items;
};
