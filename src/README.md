## React Application for Uploading images and save them to s3 Bucket:

# 1. Create a new Visual Studio React Project:

1.Install Node.js if you haven't already

2.Open a command prompt or terminal window:
npm install -g create-react-app

3.creat a new project by running:
npx create-react-app image-uploader

4.Change into the project directory:
cd image-uploader

5.Install required dependencies:
npm install aws-sdk

6.Install the axios library for making HTTP requests:
npm install axios

# 2. Install Required Packages and Dependencies to run the Project:

Prerequisites:

Ensure you have Node.js installed on your machine.

1.Open a command prompt or terminal window
2.Navigate to the project's root directory

3.Run the following command to install the necessary dependencies:
npm install:

4.This will start the development server and launch your application in a web browser:
npm start or npm run dev

# 3. AWS s3 Bucket Creation and Configuration:

1.Go to the AWS Management Console and navigate to the S3 service.
2.Click on "Create bucket" and provide a unique name for bucket which is "aws-images-bucket" in my case.
3.Choose the region where you want to create the bucket. In my case the region is "eu-north-1"
4.Configure additional settings according to the requirements. I set my S3 bucket public means allowing anyone to access the objects (files) stored in the bucket without requiring authentication or authorization but this bucket is private by default.
5.Click on "Create bucket" for creating a busket.

Set up AWS IAM policies and user:
1.Go to the AWS Management Console and navigate to the IAM service.
2.Go to "Users" and "Add User" which allows permissions to individual users or groups, ensuring that only authorized entities can interact with the bucket and its contents. I created a user wiht name "user-s3-bucket-read-write-policy".
2.Create a new IAM policy that allows the necessary actions for accessing and to manage permissions separately for each user or group. I created policy with "s3-bucket-read-write-policy" name and updated my file with the following JSON.

{
"Version": "2012-10-17",
"Id": "Policy1687276825867",
"Statement": [
{
"Sid": "Stmt1687276820069",
"Effect": "Allow",
"Principal": "_",
"Action": [
"s3:GetObject",
"s3:PutObject",
"s3:DeleteObject"
],
"Resource": "arn:aws:s3:::aws-images-bucket/_"
}
]
}
6.I editted the Cross-origin resource sharing (CORS) file in AWS S3 to configure the access permissions for resources in S3 bucket from different origins. The file has the following configurations.

[
{
"AllowedHeaders": [
"*"
],
"AllowedMethods": [
"PUT",
"HEAD",
"GET",
"DELETE"
],
"AllowedOrigins": [
"*"
],
"ExposeHeaders": [
"ETag"
]
}
] 7. Generated "Access key" and "Secret key" which I have used in my server.js file.
