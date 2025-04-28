terraform {
  backend "s3" {
    bucket         = "mangascrapper" 
    key            = "infra/terraform.tfstate"
    region         = "eu-west-1"
    encrypt        = true
    use_lockfile   = true
  }
}