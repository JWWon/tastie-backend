variable "name" { type = string }
variable "username" { type = string }
variable "password" { type = string }
variable "instance_class" { type = string }
variable "db_size" {
  default = 20
}

variable "storage_type" {
  default = "gp2"
}

variable "pg_version" {
  default = "11.5"
}