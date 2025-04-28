resource "aws_s3_bucket" "mangascrapper_bucket" {
  bucket = "mangascrapper-bucket-ziyed"

  tags = {
    Environment = "dev"
    Project     = "MangaScrapper"
  }
}

resource "aws_s3_bucket_public_access_block" "mangascrapper_bucket_block" {
  bucket = aws_s3_bucket.mangascrapper_bucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "public_read_policy" {
  bucket = aws_s3_bucket.mangascrapper_bucket.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = "*"
        Action = "s3:GetObject"
        Resource = "${aws_s3_bucket.mangascrapper_bucket.arn}/*"
      }
    ]
  })
}
