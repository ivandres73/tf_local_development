module "sqs_queue" {
  source = "../sqs"
  queue_name = var.queue_name
  tag_project = var.tag_project
  tag_environment = var.tag_environment
}

resource "aws_sns_topic_subscription" "topic_queue_sub" {
  topic_arn = var.sns_topic_arn
  protocol  = "sqs"
  endpoint  = module.sqs_queue.queue_arn
}
