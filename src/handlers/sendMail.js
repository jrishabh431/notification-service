import AWS from 'aws-sdk'

const ses = new AWS.SES({ region: 'us-east-2' })

async function sendMail(event, context) {
  const params = {
    Source: 'workmail.rishabhjain@gmail.com',
    Destination: {
      ToAddresses: ['jrishabh431@gmail.com'],
    },
    Message: {
      Body: {
        Text: {
          Data: 'Your Item is sold!',
        },
      },
      Subject: {
        Data: 'Auction Service',
      },
    },
  }

  try {
    const result = await ses.sendEmail(params).promise()
    console.log(result)
    return result
  } catch (error) {
    console.error(error)
  }
}

export const handler = sendMail
