resource "aws_ecr_repository" "mangascrapper" {
  name                 = "mangascrapper-backend"
  image_tag_mutability = "MUTABLE"
  force_delete         = true

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = {
    Project = "MangaScrapper"
    Environment = "dev"
  }
}