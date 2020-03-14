data "terraform_remote_state" "security_groups" {
  backend = "remote"
  config = {
    organization = "tastie"

    workspaces = {
      name = "backend-security-groups"
    }
  }
}
