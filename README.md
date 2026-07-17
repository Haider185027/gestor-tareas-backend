# Task Manager Backend

REST API for a task management application, built with Node.js, Express and PostgreSQL (hosted on Supabase). Each user can register, log in and manage only their own tasks, using JWT for authentication. On top of that, every new task automatically gets a priority suggested by AI, using the Claude API.

## What this project does

- User registration and login, with JWT based authentication
- Full CRUD for tasks: create, view, update and delete
- Each user can only see and modify their own tasks
- When a task is created, Claude analyzes the title and description and automatically assigns a priority (low, medium or high)
- PostgreSQL database hosted on Supabase

## Tech stack

- Node.js and Express
- PostgreSQL on Supabase
- JWT for authentication
- bcrypt for password hashing
- Claude API (claude-haiku-4-5 model) for priority suggestions

## How to run it locally

1. Clone the repository
2. Install dependencies with npm install
3. Copy the .env.example file to .env and fill in your own database credentials, your JWT secret and your Anthropic API key
4. Run the initial migration with npm run migrate
5. If you are updating a database that already existed before the AI feature, also run npm run migrate:add-priority
6. Start the server with npm run dev

## Available routes

POST /api/auth/register - Registers a new user
POST /api/auth/login - Logs in and returns a JWT
GET /api/tasks - Returns the tasks for the authenticated user
POST /api/tasks - Creates a new task, with priority assigned automatically by AI
PUT /api/tasks/:id - Updates an existing task
DELETE /api/tasks/:id - Deletes a task

## How the AI part works

When a task is created, its title and description are sent to Claude with a simple classification instruction. Claude responds with a single word (low, medium or high), which gets saved as the task's priority. If the AI call fails for any reason, whether it's a usage limit or a network issue, the task still gets created with a default priority of "medium", so this feature never blocks the core functionality of the app.

## Author

Built by Camilo Camargo, using Claude Code as part of the development workflow.
