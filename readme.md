# REST API for Contact Management

This project is a RESTful API for managing a contact list. It includes user authentication with JWT, avatar uploading using Multer, automatic avatar generation with Gravatar, and email verification using SendGrid. The API is built using Node.js, Express.js, MongoDB with Mongoose, and Jest for unit testing.

### Commands:

- `npm start` &mdash;  starts the server in production mode
- `npm run start:dev` &mdash; starts the server in development mode 
- `npm run lint` &mdash; runs a code check from ESLint
- `npm lint:fix` &mdash; same as above, but also automatically corrects simple errors

### Usage
To interact with the API, please use Postman or a similar tool.

### Avatar Generation
User avatars are generated using Gravatar based on their email addresses.
Image processing and resizing are handled using Jimp.

### Authentication
User authentication is implemented using JWT (JSON Web Tokens).

### Unit Testing
Unit tests for the entry controller (login/signin) are written using Jest.

### Author
[Marlena Dulęba]
