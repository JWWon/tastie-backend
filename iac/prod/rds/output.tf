output "dbname" {
   value = aws_db_instance.this.name
}

output "endpoint" {
   value = aws_db_instance.this.endpoint
}
