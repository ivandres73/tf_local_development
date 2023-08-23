FROM gitpod/workspace-full

USER gitpod

ENV AWS_ACCESS_KEY_ID='test'
ENV AWS_SECRET_ACCESS_KEY='test'
ENV AWS_DEFAULT_REGION='us-east-1'

RUN wget -O- https://apt.releases.hashicorp.com/gpg | gpg --dearmor | sudo tee /usr/share/keyrings/hashicorp-archive-keyring.gpg && \
    echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list && \
    sudo apt update && sudo apt-get install terraform
RUN brew install aws-sam-cli
RUN brew install localstack/tap/localstack-cli
