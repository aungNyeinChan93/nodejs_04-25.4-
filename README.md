# Mongoose Tutorial Project

This project demonstrates the use of Mongoose, a MongoDB object modeling tool designed to work in an asynchronous environment. It provides a simple and elegant way to interact with MongoDB databases in Node.js applications.

## Features

- Connect to a MongoDB database using Mongoose.
- Define schemas and models for structured data.
- Perform CRUD (Create, Read, Update, Delete) operations.
- Middleware integration for file uploads using `express-fileupload`.

## Prerequisites

- Node.js installed on your system.
- MongoDB installed and running locally or accessible via a cloud service.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd node_25/mongosse_tuto_1.25.4
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Usage

1. Start the MongoDB server if running locally.
2. Run the application:
   ```bash
   node app.js
   ```
3. Access the application at `http://localhost:3000`.

## Project Structure

- `app.js`: Main application file.
- `models/`: Contains Mongoose schemas and models.
- `routes/`: Defines application routes.
- `uploads/`: Directory for storing uploaded files.

## Notes

- Ensure MongoDB is properly configured and accessible.
- Use environment variables to store sensitive information like database credentials.
- Follow best practices for error handling and input validation.

# Usage of Dependencies

## async-redis

This is a promise-based wrapper for the Redis client, enabling asynchronous operations with Redis in Node.js applications.

#### Installation

```bash
npm install async-redis
```

#### Usage

```javascript
const asyncRedis = require("async-redis");
const client = asyncRedis.createClient();

// Set a key-value pair
client.set("key", "value").then(() => {
  console.log("Key set successfully");
});

// Get the value of a key
client.get("key").then((value) => {
  console.log("Value:", value);
});

// Handle errors
client.on("error", (err) => {
  console.error("Redis error:", err);
});
```

#### Notes

- Ensure Redis is installed and running on your system or accessible via a cloud service.
- Use environment variables to store sensitive information like Redis credentials.
- For production, configure Redis for persistence and security.
- https://www.npmjs.com/package/async-redis

## jsonwebtoken

This library is used to create and verify JSON Web Tokens (JWT), which are commonly used for authentication and secure data exchange in web applications.

#### Installation

```bash
npm install jsonwebtoken
```

#### Usage

```javascript
const jwt = require("jsonwebtoken");

// Create a token
const token = jwt.sign({ userId: 123 }, "your-secret-key", { expiresIn: "1h" });
console.log("Generated Token:", token);

// Verify a token
jwt.verify(token, "your-secret-key", (err, decoded) => {
  if (err) {
    console.error("Token verification failed:", err);
  } else {
    console.log("Decoded Token:", decoded);
  }
});
```

#### Notes

- Replace `"your-secret-key"` with a strong, secure key stored in environment variables.
- Use short expiration times for tokens and refresh them as needed.
- Always validate and sanitize user input to prevent security vulnerabilities.
- https://www.npmjs.com/package/jsonwebtoken

## express-fileupload

This is a middleware for handling file uploads in Express applications. It simplifies the process of uploading files to your server.

#### Installation

```bash
npm install express-fileupload
```

#### Usage

```javascript
const fileUpload = require("express-fileupload");

// Enable file upload
app.use(fileUpload());

// Upload endpoint
app.post("/upload", (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  // Access the uploaded file
  let uploadedFile = req.files.file;

  // Move the file to a desired location
  uploadedFile.mv("./uploads/" + uploadedFile.name, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send("File uploaded successfully!");
  });
});
```

#### Notes

- Ensure the `uploads` directory exists or create it before running the application.
- Use proper validation and security measures when handling file uploads.
- For production, consider limiting file size and types to prevent abuse.
- https://www.npmjs.com/package/express-fileupload
