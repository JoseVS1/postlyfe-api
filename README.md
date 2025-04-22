# Postlyfe (Social Media App) - Backend

The backend server for the Postlyfe social media application, handling user authentication, data management, and API endpoints.

## Overview

Postlyfe Backend is a Node.js application built with Express and PostgreSQL (using Prisma). It provides the core functionalities for the Postlyfe social media platform, including managing users, posts, comments, likes, and follows. It serves as the API layer for the Postlyfe frontend application.

## Features

-   **User Authentication:** Secure signup, login, logout, and session management using Passport.js.
-   **Post Management:** Create, retrieve, update, and soft-delete posts.
-   **Comment System:** Add comments to posts, reply to comments (nested), update, and delete comments.
-   **Like Functionality:** Like and unlike posts, retrieve post like counts.
-   **Follow System:** Send follow requests, accept/reject requests, view follower/following status.
-   **Profile Management:** Update user profile details (bio, name, picture URL, etc.).
-   **Data Persistence:** Stores all application data in a PostgreSQL database via Prisma ORM.
-   **API Endpoints:** Provides a RESTful API for frontend consumption.

## Technology Stack

-   **Backend:** Node.js, Express
-   **Database:** PostgreSQL
-   **ORM:** Prisma
-   **Authentication:** Passport.js (local strategy), express-session, connect-pg-simple
-   **Password Hashing:** bcryptjs
-   **API:** RESTful principles
-   **CORS:** cors middleware
-   **Environment Variables:** dotenv
-   **Utilities:** Gravatar generation (crypto)

## Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/JoseVS1/postlyfe-api.git
    cd postlyfe-api
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

3.  Create a `.env` file in the root directory with the following variables:

    ```env
    DATABASE_URL="postgresql://username:password@localhost:5432/postlyfe_db"
    SESSION_SECRET=your_very_secure_session_secret
    PORT=3000
    # Optional: Add any other necessary environment variables
    ```

4.  Set up the database using Prisma:

    ```bash
    npx prisma migrate dev --name init
    # Or 'npx prisma db push' if you prefer not using migrations initially
    ```

5.  Start the server:

    ```bash
    npm start
    # Or 'npm run dev' if you have a development script configured (e.g., with nodemon)
    ```

## Project Structure

```
└── ./
├── config
│ ├── passport.js
│ └── pool.js
├── controllers
│ ├── authController.js
│ ├── commentController.js
│ ├── followController.js
│ ├── likeController.js
│ ├── postController.js
│ ├── profileController.js
│ └── userController.js
├── middleware
│ └── isLoggedIn.js
├── models
│ └── prismaClient.js
├── prisma
│ └── schema.prisma
├── routes
│ ├── apiRoutes.js
│ ├── authRoutes.js
│ ├── commentRoutes.js
│ ├── followRoutes.js
│ ├── likeRoutes.js
│ ├── postRoutes.js
│ ├── profileRoutes.js
│ └── userRoutes.js
├── utils
│ ├── generate-gravatar.js
│ ├── genPassword.js
│ └── validPass.js
└── app.js
```

## Usage

The backend runs as an API server. It listens for requests from the frontend application (or tools like Postman/curl) on the configured port. Ensure the backend server is running before starting the frontend application.

## API Endpoints

Base Path: `/api`

### Auth Routes (`/auth`)

-   `GET /status` - Check user authentication status.
-   `POST /signup` - Register a new user.
-   `POST /login` - Authenticate and log in a user.
-   `GET /logout` - Log out the current user.

### User Routes (`/users`)

-   `GET /` - Get users (with optional filters like `pending`, `notFollowing`, `accepted`). (Requires Auth)
-   `GET /:id` - Get details for a specific user.
-   `GET /:id/posts` - Get all non-deleted posts for a specific user.

### Profile Routes (`/profiles`)

-   `PUT /:id` - Update profile details for the logged-in user's profile. (Requires Auth)

### Post Routes (`/posts`)

-   `GET /` - Get all non-deleted posts (ordered by creation date).
-   `GET /:id` - Get details for a specific post.
-   `POST /` - Create a new post. (Requires Auth)
-   `PUT /:id` - Update an existing post (content, isDeleted). (Requires Auth & Ownership)

### Comment Routes (`/comments`)

-   `GET /posts/:id` - Get top-level comments for a specific post.
-   `GET /:id` - Get replies for a specific comment.
-   `POST /` - Create a new comment or reply. (Requires Auth)
-   `PUT /:id` - Update an existing comment. (Requires Auth & Ownership)
-   `DELETE /:id` - Delete a comment. (Requires Auth & Ownership)

### Follow Routes (`/follows`)

-   `GET /` - Get the follow status of users the current user is following. (Requires Auth)
-   `GET /:id` - Get the follow status between the current user and another user. (Requires Auth)
-   `POST /` - Create/Send a follow request (or unfollow if already accepted/pending). (Requires Auth)
-   `PUT /:id` - Update a follow request status (accept/reject). (Requires Auth & Recipient)

### Like Routes (`/likes`)

-   `GET /:id` - Get likes for a post and check if the current user has liked it. (Requires Auth)
-   `POST /` - Like a post. (Requires Auth)
-   `DELETE /:id` - Unlike a post. (Requires Auth)

## Security

-   Passwords are securely hashed using bcryptjs.
-   Sessions are managed using `express-session` with `connect-pg-simple` for persistent storage.
-   Protected routes require authentication using the `isLoggedIn` middleware.
-   CORS is configured to allow requests only from the specified frontend origin.

## Contributing

1.  Fork the repository
2.  Create a feature branch (`git checkout -b feature/amazing-feature`)
3.  Commit your changes (`git commit -m 'Add some amazing feature'`)
4.  Push to the branch (`git push origin feature/amazing-feature`)
5.  Open a Pull Request

## License

MIT License

## Acknowledgements

-   [Express.js](https://expressjs.com/)
-   [Prisma](https://www.prisma.io/)
-   [Passport.js](http://www.passportjs.org/)
-   [PostgreSQL](https://www.postgresql.org/)
-   [Node.js](https://nodejs.org/)
-   [bcryptjs](https://github.com/dcodeIO/bcrypt.js)
