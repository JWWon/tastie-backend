provider "aws" {}

terraform {
  backend "remote" {
    organization = "tastie"
    workspaces {
      name = "backend-rds-production"
    }
  }
}