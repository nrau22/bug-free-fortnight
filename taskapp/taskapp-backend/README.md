# TaskApp Backend

This is the backend for the TaskApp project, built using Node.js and Express. It provides a RESTful API for managing tasks.

## Project Structure

```
taskapp-backend
├── src
│   ├── app.js            # Entry point of the application
│   ├── routes            # Contains route definitions
│   │   └── index.js      # API routes
│   └── controllers       # Contains request handlers
│       └── index.js      # Logic for handling requests
├── package.json          # NPM configuration file
├── .gitignore            # Specifies files to ignore in Git
└── README.md             # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node package manager)

### Installation

1. Clone the repository:

   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```
   cd taskapp-backend
   ```

3. Install the dependencies:

   ```
   npm install
   ```

### Running the Application

To start the server, run:

```
npm start
```

The server will be running on `http://localhost:3000`.

### API Endpoints

- `GET /tasks` - Retrieve all tasks
- `POST /tasks` - Add a new task
- `DELETE /tasks/:id` - Delete a task by ID

### License

This project is licensed under the MIT License.