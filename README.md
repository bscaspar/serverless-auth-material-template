## Project Description

This project is a basic app build on Create React App that implements the AWS Amplify library to enable basic auth through Amazon Cognito Identity Pools and User Pools. It includes basic routing logic to direct authenticated or unauthenticated users to appropriate pages, and some basic settings functionality, and Material UI components.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and is largely influenced by the great [serverless-stack](https://serverless-stack.com) demo.

## Usage

This is meant to be used in combination with [the backend](https://github.com/bscaspar/serverless-cognito-auth) and won't workout as documented without first deploying that repo.

* Clone repo
* `npm install`
* update src/config.js file with outputs from build of backend
  * ignore S3 configs
  * apiGateway.URL = ServiceEndpoint
  * Cognito
    * .USER_POOL.ID = UserPoolID
    * .APP_CLIENT_ID = UserPoolClientId
    * .IDENTITY_POOL_ID = IdentityPoolId
* at this point you can run locally with `npm run start`
* to host in a static S3 bucket
  * create new S3 bucket with all default configs
  * go to bucket -> permission -> bucket policy
    * bucket permissions - uncheck both Manage public bucket policies
    * in Bucket policy editor, add the following after updating <bucket_name> with the bucket's name (this policy makes the bucket public)
```javascript
{
  "Version": "2012-10-17",
  "Statement": [
    {
		  "Sid": "PublicReadForGetBucketObjects",
		  "Effect": "Allow",
		  "Principal": "*",
		  "Action": [
		    "s3:GetObject"
		    ],
		    "Resource": [
		      "arn:aws:s3:::<bucket_name>/*"
		      ]
		    }
		  ]
    }
```

  * bucket properties -> Static web site hosting
  * select use this bucket to host a website
  * input index.html for index doc and error doc because we are handling errors in the app
  * write down the bucket's endpoint
  * `npm run build`
  * deploy to S3 `aws s3 sync build/ s3://YOUR_S3_DEPLOY_BUCKET_NAME`
    * to update, run `aws s3 sync build/ s3://YOUR_S3_DEPLOY_BUCKET_NAME --delete`
  * navigate to endpoint to confirm
