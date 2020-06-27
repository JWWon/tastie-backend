resource "aws_db_instance" "this" {
  identifier          = "tastie-main-production"
  allocated_storage   = var.db_size
  storage_type        = var.storage_type
  engine              = "postgres"
  engine_version      = var.pg_version
  instance_class      = var.instance_class
  name                = var.name
  username            = var.username
  password            = var.password
  publicly_accessible = true
  skip_final_snapshot = true

  vpc_security_group_ids = [data.terraform_remote_state.security_groups.outputs.allow_postgres_id]
}