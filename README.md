# Task Manager Backend

A REST API for a task management app, built with Node.js, Express, and PostgreSQL (hosted on Supabase). Each user can register, log in, and manage only their own tasks — authentication is handled with JWT.

## Features

- User registration and login (JWT-based auth)
- Full CRUD for tasks (create, read, update, delete)
- Each user can only access their own tasks
- PostgreSQL database hosted on Supabase

## Tech Stack

- Node.js + Express
- PostgreSQL (Supabase)
- JWT for authentication
- bcrypt for password hashing

## Getting Started

1. Clone the repo
2. Run `npm install`
3. Copy `.env.example` to `.env` and fill in your own database credentials and JWT secret
4. Run the database migration: `npm run migrate`
5. Start the server: `npm run dev`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register a new user |
| POST | /api/auth/login | Log in and receive a JWT |
| GET | /api/tasks | Get all tasks for the logged-in user |
| POST | /api/tasks | Create a new task |
| PUT | /api/tasks/:id | Update a task |
| DELETE | /api/tasks/:id | Delete a task |

## Author

Built by Camilo Camargo as part of learning backend development, using AI-assisted tools (Claude Code) as part of the workflow.
