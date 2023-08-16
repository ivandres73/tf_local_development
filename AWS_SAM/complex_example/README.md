## HOW TO RUN LAMBDAS LOCALLY USING SAM

Requirements:
- Install [AWS SAM](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
- Install [Docker](https://docs.docker.com/get-docker/)

You can invoke a lambda locally using this command:
    `sam local invoke -e (pathToEvent/event.json) (functionName)`

1. To get `functionName` see `template.yml` where Lambdas are defined, new Lambdas must be added to the template.

    How to define a lambda to test locally: 
    - Lambda has to be defined with his function name as `AWS::Serverless::Function` in `template.yml`
    - In Properties, CodeUri is the relative path to the Lambda Function
    - In Properties, Handler format is fileName/handlerName

    Updates of lambda's environment variables has to be added to lambdas properties in the template

2. Events are located in `./src/events`, events are `.json` file.

Example to invoke `complexLambda` using `complex-event.json`:
    `sam local invoke -e ./events/complex-event.json complexLambda`
