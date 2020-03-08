locals {
  application_name        = "Tastie-Backend"
  application_description = "Tastie-Backend beanstalk application"
}

resource "aws_elastic_beanstalk_application" "this" {
  name        = local.application_name
  description = local.application_description
}