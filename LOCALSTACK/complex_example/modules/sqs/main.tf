resource "aws_sqs_queue" "queue" {
  name       = var.queue_name
  fifo_queue = false

  tags = {
    "Project" = var.tag_project
    "Environment" = var.tag_environment
  }
}
