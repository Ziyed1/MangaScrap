const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();
const TABLE = 'UserManga';

exports.addFavorite = async (req, res) => {
  const { userId, mangaId } = req.body;

  const item = {
    userId,
    mangaId,
    currentChapter: 1
  };

  try {
    await dynamo.put({ TableName: TABLE, Item: item }).promise();
    res.status(201).json({ message: "Manga ajouté aux favoris." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getFavorites = async (req, res) => {
  const { userId } = req.params;

  const params = {
    TableName: TABLE,
    KeyConditionExpression: 'userId = :uid',
    ExpressionAttributeValues: {
      ':uid': userId
    }
  };

  try {
    const data = await dynamo.query(params).promise();
    res.json(data.Items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProgress = async (req, res) => {
  const { userId, mangaId } = req.params;
  const { currentChapter } = req.body;

  const params = {
    TableName: TABLE,
    Key: { userId, mangaId },
    UpdateExpression: 'set currentChapter = :c',
    ExpressionAttributeValues: {
      ':c': currentChapter
    }
  };

  try {
    await dynamo.update(params).promise();
    res.json({ message: "Progression mise à jour." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
