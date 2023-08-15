## HOW TO RUN LAMBDAS LOCALLY USING SAM

Requirements:
- Install [AWS Credentials](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-getting-started-set-up-credentials.html) (AWS Access Key ID, AWS Secret Access Key)
- Install [AWS SAM](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
- Install [Dockers](https://docs.docker.com/get-docker/)

You can invoke a lambda locally using this command:
    `sam local invoke -e (pathToEvent/event.json) (functionName)`

Run this script before trying to test the lambda, to install all dependencies:

```
npm ci && \
npm run lint && \
cd ./src/lambda/resolvers/ && npm ci --production && \
cd ../triggers/sqs/create-marbyl-queue-handler/ && npm ci --production && \
cd ../../../dynamo-to-elasticsearch/ && npm ci --production && \
cd ../../layers/chrome-aws-lambda/nodejs/ && npm ci --production && \
cd ../../puppeteer-core/nodejs/ && npm ci --production && \
cd ../../rss-parser/nodejs/ && npm ci --production && \
cd ../../../../
```

1. To configure AWS credentials use:
    `aws configure`

2. To get `functionName` see `template.yml` where Lambdas are defined, new Lambdas must be added to the template.

    How to define a lambda to test locally: 
    - Lambda has to be defined with his function name as `AWS::Serverless::Function` in `template.yml`
    - In Properties, CodeUri is the relative path to the Lambda Function
    - In Properties, Handler format is fileName/handlerName

    Updates of lambda's environment variables has to be added to lambdas properties in the template

3. Events are located in `./src/events`, events are `.json` file.

Example to invoke appSyncMarbylFn using getMarbylbyid event (in root directory):
    `sam local invoke -e ./events/resolvers/get-marbyl-by-id.json appSyncMarbylsFn`
