import os from "os";
//import { listApplicants } from "./database/list-applicants"; // Import listApplicants function

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */

export const lambdaHandler = async (event, context) => {
    try {

        // Call the listApplicants function to get the list of applicants
        //const allApplicants = await listApplicants();

        return {
            'statusCode': 200,
            headers: {
                "Access-Control-Allow-Headers" : "Content-Type",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            },
            'body': JSON.stringify([{
                uuid : "1234",
                firstName : "maziar",
                lastName : "navabi",
                mobile : "0400000000",
                email : "mazi@maz.com",
                isPrimary : false,
                os : os.hostname()
            }])
            //'body': JSON.stringify(allApplicants) // Return the list of applicants
        }
    } catch (err) {
        console.log(err);
        return err;
    }
};
