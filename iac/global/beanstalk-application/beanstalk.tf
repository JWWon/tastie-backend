locals {
  application_name        = "Tastie-Backend"
  application_description = "Tastie-Backend beanstalk application"
}

resource "aws_elastic_beanstalk_application" "this" {
  name        = local.application_name
  description = local.application_description
}

resource "aws_iam_role" "ec2" {
  name               = "aws-iam-role-eb"
  assume_role_policy = data.aws_iam_policy_document.ec2.json
}

resource "aws_iam_instance_profile" "ec2" {
  name = "iam-instance-profile-eb"
  role = aws_iam_role.ec2.name
}
