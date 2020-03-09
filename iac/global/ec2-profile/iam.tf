resource "aws_iam_role" "this" {
  name               = "aws-iam-role-eb"
  assume_role_policy = data.aws_iam_policy_document.this.json
}

resource "aws_iam_role_policy_attachment" "web_tier" {
  role       = aws_iam_role.this.name
  policy_arn = "arn:aws:iam::aws:policy/AWSElasticBeanstalkWebTier"
}

resource "aws_iam_role_policy_attachment" "readonly_access" {
  role       = aws_iam_role.this.name
  policy_arn = "arn:aws:iam::aws:policy/AWSElasticBeanstalkReadOnlyAccess"
}

resource "aws_iam_instance_profile" "this" {
  name = "iam-instance-profile-eb"
  role = aws_iam_role.this.name
}
