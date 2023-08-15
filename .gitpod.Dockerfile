FROM gitpod/workspace-full

USER gitpod

#RUN wget -O- https://apt.releases.hashicorp.com/gpg | gpg --dearmor | sudo tee /usr/share/keyrings/hashicorp-archive-keyring.gpg && \
#    echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list && \
#    sudo apt update && sudo apt-get install terraform && \
RUN docker pull localstack/localstack:2.2.0
RUN docker pull public.ecr.aws/lambda/nodejs:18-rapid-x86_64
RUN docker pull public.ecr.aws/lambda/nodejs:18-x86_64
RUN brew install aws-sam-cli
