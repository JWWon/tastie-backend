output "application_name" {
    value = aws_elastic_beanstalk_application.this.name
}

output "profile_name" {
    value = aws_iam_instance_profile.ec2.name
}