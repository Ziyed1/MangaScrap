resource "aws_dynamodb_table" "mangas" {
  name           = "Mangas"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "mangaId"

  attribute {
    name = "mangaId"
    type = "S"
  }

  tags = {
    Environment = "dev"
    Project     = "MangaScrapper"
  }
}