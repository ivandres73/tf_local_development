provider "aws" {
  endpoints {
    ec2 = "http://127.0.0.1:4566"
  }
  region = "us-east-1"
}

resource "aws_vpc" "my_vpc" {
  cidr_block = "172.16.0.0/16"
}

resource "aws_subnet" "my_subnet" {
  vpc_id            = aws_vpc.my_vpc.id
  cidr_block        = "172.16.10.0/24"
  availability_zone = "us-east-1a"
}

resource "aws_instance" "my_instance" {
  ami           = "ami-08a52ddb321b32a8c" # Amazon Linux 2023
  instance_type = "t2.micro"
}
