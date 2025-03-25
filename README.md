# Contact Manager API

This is a RESTful API built with Node.js, Express, and MongoDB for managing contacts. It includes user registration, login, and CRUD operations for contacts, secured with JWT authentication and bcrypt password hashing.

## Features

* **User Authentication:**
    * User registration and login.
    * JWT (JSON Web Tokens) for secure authentication.
    * bcrypt for password hashing.
* **Contact Management:**
    * Create, read, update, and delete contacts.
    * RESTful API endpoints for easy interaction.
* **MongoDB Integration:**
    * Stores contact data in a MongoDB database.

## Technologies Used

* **Node.js:** JavaScript runtime environment.
* **Express:** Web application framework for Node.js.
* **MongoDB:** NoSQL database.
* **Mongoose:** MongoDB object modeling tool.
* **bcrypt:** Password hashing library.
* **jsonwebtoken:** JSON Web Token library for authentication.
* **nodemon:** Development tool to automatically restart the server.

## Getting Started

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**

    * Create a `.env` file in the root directory.
    * Add the following variables:

        ```
        MONGODB_URI=<your_mongodb_connection_string>
        JWT_SECRET=<your_jwt_secret_key>
        PORT=5001
        ```

        * Replace `<your_mongodb_connection_string>` with your MongoDB connection string.
        * Replace `<your_jwt_secret_key>` with a strong, random secret key.
        * Change PORT if needed.

4.  **Start the server:**

    ```bash
    npm run dev
    ```

    This will start the server using nodemon, which automatically restarts the server when changes are detected.

## API Endpoints

### User Authentication

* **Register:** `POST http://localhost:5001/api/users/register`
    * Request body: JSON object with `username`, `email`, and `password`.
* **Login:** `POST http://localhost:5001/api/users/login`
    * Request body: JSON object with `email` and `password`.
    * Response : returns a json object with the generated access token.
### Contact Management

* **Get all contacts:** `GET http://localhost:5001/api/contacts/`
    * Requires a valid JWT token in the `Authorization` header (`Bearer <token>`).
* **Create contact:** `POST http://localhost:5001/api/contacts/`
    * Request body: JSON object with contact details (e.g., `name`, `email`, `phone`).
    * Requires a valid JWT token in the `Authorization` header (`Bearer <token>`).
* **Update contact:** `PUT http://localhost:5001/api/contacts/:id`
    * Replace `:id` with the contact ID.
    * Request body: JSON object with updated contact details.
    * Requires a valid JWT token in the `Authorization` header (`Bearer <token>`).
* **Delete contact:** `DELETE http://localhost:5001/api/contacts/:id`
    * Replace `:id` with the contact ID.
    * Requires a valid JWT token in the `Authorization` header (`Bearer <token>`).

## Testing with Postman/Thunder Client

1.  **Register a user:**
    * Send a `POST` request to `http://localhost:5001/api/users/register` with the required user details.
2.  **Login:**
    * Send a `POST` request to `http://localhost:5001/api/users/login` with the user's email and password.
    * Copy the access token from the response.
3.  **Access protected endpoints:**
    * For contact management endpoints, add an `Authorization` header with the value `Bearer <your_access_token>`.
    * Replace `<your_access_token>` with the copied token.
4.  **Perform CRUD operations:**
    * Use `GET`, `POST`, `PUT`, and `DELETE` requests to manage contacts.

## Notes

* Ensure MongoDB is running and the connection string is correctly set in the `.env` file.
* Keep the `JWT_SECRET` secure.
* This application uses nodemon for development, for production use a process manager like pm2.
