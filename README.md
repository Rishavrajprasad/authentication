# Authentication App using Node.js and Express

This project implements an Authentication API using Node.js and Express.js.

## Project Setup

### Clone the Repository
git clone <repository_url>
### Install Dependencies
bash

npm install

### Environment Variables
Create a .env file in the root directory and add the following environment variables:

MONGO=<your_mongodb_connection_string>

JWT_SECRET=<your_jwt_secret_token>

### Run the Project
To start the server, run the following command in the root directory:


npm run dev

API Endpoints

Sign up API: localhost:3000/api/auth/signup

Sign in API: localhost:3000/api/auth/signin

Forgot Password API: localhost:3000/api/auth/forgot
