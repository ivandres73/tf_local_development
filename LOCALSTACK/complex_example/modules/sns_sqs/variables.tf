variable "queue_name" {
  default = "queue1.fifo"
}

variable "sns_topic_arn" {
    description = "The ARN of the Parent SNS"
}

variable "tag_project" {
  default = "my_tag"
}

variable "tag_environment" {
  default = "my_tag"
}