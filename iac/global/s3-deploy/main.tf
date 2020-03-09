provider "aws" {}

terraform {
  backend "remote" {
    organization = "tastie"
    workspaces {
      name = "backend-s3-deploy"
    }
  }
}
