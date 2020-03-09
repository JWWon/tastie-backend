locals {
  bucket_name = "tastie-backend-deploy"
}

resource "aws_s3_bucket" "this" {
  bucket = local.bucket_name
  acl    = "private"
}

resource "aws_s3_bucket_object" "dockercfg" {
  bucket = aws_s3_bucket.this.id
  key    = "dockercfg"
  source = "dockercfg"

  depends_on = [null_resource.this]
}

resource "null_resource" "this" {
  triggers = {
    build_number = "${timestamp()}"
  }

  provisioner "local-exec" {
    command = "echo '{\"registry.gitlab.com\": {\"auth\": \"$DOCKER_REGISTRY_TOKEN\"}}' | envsubst > dockercfg"
  }
}