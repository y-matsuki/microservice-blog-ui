# microservice-blog-ui

Blog ui for AWS Lambda microservice-http-endpoint.

## setup

```bash
$ git clone https://github.com/y-matsuki/microservice-blog-ui.git
$ cd microservice-blog-ui
$ npm install
# build source to dest/*
$ gulp build
# launch standalone server
$ gulp debug
```

## config

Edit **src/js/config.js**.

- ENDPOINT: your api gateway endpoint.
- API_KEY: your api gateway api-key.
- TABLE_NAME: your DynamoDB table name.
 - HashKey: { S: user }
 - RangeKey: { N: date }

```javascript
var ENDPOINT = "https://0000000000.execute-api.us-east-1.amazonaws.com/prod/microservice-http-endpoint";
var API_KEY = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
var TABLE_NAME = "blog-post"
```

## deploy

1. Create s3 bucket.
2. Setting static web site hosting.
3. Add s3 bucket with bucket policy.
4. Copy this directory to s3 bucket (deploy.sh).

```json
{
	"Version": "2012-10-17",
	"Statement": [
		{
			"Sid": "PublicReadForGetBucketObjects",
			"Effect": "Allow",
			"Principal": "*",
			"Action": "s3:GetObject",
			"Resource": "arn:aws:s3:::YOUR_BUCKET_NAME/*"
		}
	]
}
```
