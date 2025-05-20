resource "aws_dynamodb_table" "users" {
  name           = "Users"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "email"

  attribute {
    name = "email"
    type = "S"
  }

  tags = {
    Environment = "dev"
    Project     = "MangaScrapper"
  }
}

resource "aws_dynamodb_table" "user_manga" {
  name         = "UserManga"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "userId"
  range_key    = "mangaId"

  attribute {
    name = "userId"
    type = "S"
  }

  attribute {
    name = "mangaId"
    type = "S"
  }

  tags = {
    Project = "MangaScrapper"
  }
}
