provider "aws" {}

terraform {
  backend "remote" {
    organization = "tastie"
    workspaces {
      name = "backend-beanstalk-environment-staging"
    }
  }
}

module "beanstalk_environment" {
  source  = "app.terraform.io/tastie/eb-backend/aws"
  version = "0.1.1"

  name                = "staging"
  solution_stack_name = "64bit Amazon Linux 2018.03 v2.14.2 running Docker 18.09.9-ce"

  instance_type                = "t2.micro"
  application_port             = "80"
  healthcheck_url              = "/api/app/healthy"
  loadbalancer_certificate_arn = var.loadbalancer_certificate_arn

  google_place_apikey = var.google_place_apikey
  postgres_host       = var.postgres_host
  postgres_dbname     = var.postgres_dbname
  postgres_username   = var.postgres_username
  postgres_password   = var.postgres_password
  sendinblue_apikey   = var.sendinblue_apikey
  listen_port         = var.listen_port
  mongo_url           = var.mongo_url
  swagger_enable      = true
}