# Social-Network
This is an API for a social network web application built using Express.js, MongoDB, and Mongoose.

Table of Contents
Features
Installation
Usage
Walkthrough Video
Technical Details
Credits
Features
Allows users to share their thoughts.
Users can react to friends' thoughts.
Users can create and manage a friend list.
Supports CRUD operations for users, thoughts, reactions, and friend lists.
Installation
Clone this repository:

bash
Copy code
git clone <repository-url>
Install dependencies:

bash
Copy code
npm install
Set up MongoDB:

Make sure MongoDB is installed and running locally.
Optionally, you can provide a connection URI for a remote MongoDB instance in the .env file.
Usage
To start the server and sync Mongoose models with the MongoDB database, run:

bash
Copy code
npm start
The server will be running at http://localhost:3000 by default.

# Social Media API Documentation

This documentation provides an overview of the available routes in the Social Media API.

## Users

### Get All Users

- Endpoint: `/api/users`
- Method: `GET`
- Description: Retrieves a list of all users.
- Response:
  - Status Code: `200 OK`
  - Content: Array of user objects.

### Get User by ID

- Endpoint: `/api/users/:id`
- Method: `GET`
- Description: Retrieves a single user by their ID.
- Parameters:
  - `id`: The ID of the user.
- Response:
  - Status Code: `200 OK`
  - Content: User object.
  - Status Code: `404 Not Found` if user with specified ID does not exist.

### Create New User

- Endpoint: `/api/users`
- Method: `POST`
- Description: Creates a new user.
- Request Body:
  - `username`: String (required)
  - `email`: String (required)
- Response:
  - Status Code: `201 Created`
  - Content: Created user object.
  - Status Code: `400 Bad Request` if request body is invalid.

### Update User

- Endpoint: `/api/users/:id`
- Method: `PUT`
- Description: Updates an existing user by their ID.
- Parameters:
  - `id`: The ID of the user.
- Request Body: Updated user data.
- Response:
  - Status Code: `200 OK`
  - Content: Updated user object.
  - Status Code: `404 Not Found` if user with specified ID does not exist.

### Delete User

- Endpoint: `/api/users/:id`
- Method: `DELETE`
- Description: Deletes a user by their ID.
- Parameters:
  - `id`: The ID of the user.
- Response:
  - Status Code: `200 OK`
  - Content: Success message.
  - Status Code: `404 Not Found` if user with specified ID does not exist.

## Thoughts

### Get All Thoughts

... (Repeat the format for Thoughts routes)

## Reactions

... (Repeat the format for Reactions routes)

API Routes
GET all users: /api/users
GET a single user by id: /api/users/:id
POST a new user: /api/users
PUT to update a user by id: /api/users/:id
DELETE to remove user by id: /api/users/:id
[More routes for thoughts, reactions, and friend lists...]

Walkthrough Video
Link to the walkthrough video demonstrating the functionality of the social media API.

The walkthrough video covers the following:

Starting the application's server
Testing GET routes for all users and thoughts in Insomnia
Testing GET routes for a single user and a single thought in Insomnia
Testing POST, PUT, and DELETE routes for users and thoughts in Insomnia
Testing POST and DELETE routes for a user’s friend list in Insomnia
Testing POST and DELETE routes for reactions to thoughts in Insomnia
Technical Details
This project uses Express.js for routing.
Mongoose is used as the ODM to connect to the MongoDB database.
User and Thought models are defined with the specified schema settings.
Reactions are implemented as the reaction field's subdocument schema in the Thought model.
Timestamps are formatted using native JavaScript Date objects.
Credits
This project is created by Teremus Pigford.