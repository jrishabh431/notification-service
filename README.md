# Notification Service

## Features

- Send Emails
- SQS to handle load
- SQS URL and ARL exported as output variable from this stack
- ES6-friendly

## Getting started

### 1. Clone the repository (or generate a serverless project)
```sh
sls create --name auth-service --template-url https://github.com/jrishabh431/notification-service
cd auth-service
```

### 2. Install dependencies

```sh
npm install
```

### 3. Deploy the stack

We need to deploy the stack in order to consume the private/public testing endpoints.

```sh
sls deploy -v
```

<hr/>

## Bonus: Cross-stack authorization

Output varialble has been configured under the resources object:

```yaml
resources:
    Resources:
        MailQueue: ${file(resources/MailQueue.yml):MailQueue}
    Outputs:
        MailQueueArn:
            Value: ${self:custom.mailQueue.arn}
            Export:
                Name: ${self:custom.mailQueue.name}-Arn
        MailQueueUrl:
            Value: ${self:custom.mailQueue.url}
            Export:
                Name: ${self:custom.mailQueue.name}-Url}
```

where custom is defined as:

```yaml
resources:
    Resources:
        MailQueue: ${file(resources/MailQueue.yml):MailQueue}
    Outputs:
        MailQueueArn:
            Value: ${self:custom.mailQueue.arn}
            Export:
                Name: ${self:custom.mailQueue.name}-Arn
        MailQueueUrl:
            Value: ${self:custom.mailQueue.url}
            Export:
                Name: ${self:custom.mailQueue.name}-Url}
```

#### Example:

```yaml
custom:
    mailQueue:
        name: MailQueue-${self:provider.stage}
        arn: !GetAtt MailQueue.Arn
        url: !Ref MailQueue
    bundle:
        linting: false
```

If everything was set up correctly, we would be able to make use of these output variable from this stack in any other stack as -
- ${cf:notification-service-${self:provider.stage}.MailQueueArn}
- ${cf:notification-service-${self:provider.stage}.MailQueueUrl}

