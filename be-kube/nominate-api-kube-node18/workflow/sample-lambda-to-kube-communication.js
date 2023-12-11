//Lambda
import AWS from 'aws-sdk';

const sqs = new AWS.SQS();
const QUEUE_URL = 'YOUR_SQS_QUEUE_URL'; // Replace with your SQS queue URL

export const lambdaHandler = async (event, context) => {
    try {
        // Extract user input from event
        const userInput = {
            uuid: "1234",
            firstName: "maziar",
            lastName: "navabi",
            mobile: "0400000000",
            email: "mazi@maz.com",
            isPrimary: false,
        };

        // Send user input as a message to SQS
        await sqs.sendMessage({
            QueueUrl: QUEUE_URL,
            MessageBody: JSON.stringify(userInput),
        }).promise();

        return {
            'statusCode': 200,
            'body': 'Message sent to SQS successfully!',
        };
    } catch (err) {
        console.error(err);
        return {
            'statusCode': 500,
            'body': 'Error sending message to SQS',
        };
    }
};


//Kube

const AWS = require('aws-sdk');

const sqs = new AWS.SQS();
const QUEUE_URL = 'YOUR_SQS_QUEUE_URL'; // Replace with your SQS queue URL

async function receiveMessages() {
    const params = {
        QueueUrl: QUEUE_URL,
        MaxNumberOfMessages: 1,
        VisibilityTimeout: 10,
        WaitTimeSeconds: 0,
    };

    try {
        const data = await sqs.receiveMessage(params).promise();

        if (data.Messages) {
            const message = data.Messages[0];
            const user = JSON.parse(message.Body);

            // Process the received user input
            console.log('Received User Input:', user);

            // Delete the message from the queue
            await sqs.deleteMessage({
                QueueUrl: QUEUE_URL,
                ReceiptHandle: message.ReceiptHandle,
            }).promise();
        } else {
            console.log('No messages in the queue.');
        }
    } catch (error) {
        console.error('Error receiving messages from SQS:', error);
    }
}

// Run the receiveMessages function periodically
setInterval(receiveMessages, 5000); // Adjust the interval as needed
