provider "aws" {
  endpoints {
    sns = "http://localhost:4566"
    sqs = "http://localhost:4566"
  }
  region = "us-east-1"
}

module "sns_topics" {
  source = "./modules/sns"
  topic_name = "all-projects-topics"
}

module "sqs_sub_1" {
    source = "./modules/sns_sqs"
    queue_name = "justTrackQueue"
    sns_topic_arn = module.sns_topics.topic_arn
    tag_project = "justTrack"
    tag_environment = "live"
}

module "sqs_sub_2" {
    source = "./modules/sns_sqs"
    queue_name = "justViewQueue"
    sns_topic_arn = module.sns_topics.topic_arn
    tag_project = "justView"
    tag_environment = "staging"
}
