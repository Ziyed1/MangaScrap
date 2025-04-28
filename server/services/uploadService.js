const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");
const util = require("util");

const s3 = new S3Client({ region: "eu-west-1" });

const BUCKET_NAME = "mangascrapper-bucket-ziyed";

// Convertir fs.unlink en promesse
const unlinkFile = util.promisify(fs.unlink);

exports.uploadCoverImage = async (filePath) => {
  const fileContent = fs.readFileSync(filePath);
  const fileName = `${uuidv4()}${path.extname(filePath)}`;

  const params = {
    Bucket: BUCKET_NAME,
    Key: `covers/${fileName}`,
    Body: fileContent,
    ContentType: "image/jpeg",
  };

  await s3.send(new PutObjectCommand(params));

  // Supprimer le fichier local après upload réussi
  await unlinkFile(filePath);

  return `https://${BUCKET_NAME}.s3.eu-west-1.amazonaws.com/covers/${fileName}`;
};
