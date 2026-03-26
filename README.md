# Real Estate Plot Management System

A full-stack system to manage property leads, plots, and payments with real-time updates and n8n webhook integration.

## Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, Lucide React, Recharts, Socket.io-client.
- **Backend**: Node.js, Express, TypeScript, Socket.io, Supabase.
- **Database**: Supabase (PostgreSQL).

## Project Structure

- `/server`: Node.js + TS Backend.
- `/client`: React + Vite Frontend.
- `supabase_schema.sql`: Database schema and dummy data.

## Setup Instructions

### 1. Database Setup
- Go to [Supabase](https://supabase.com/) and create a new project.
- Open the SQL Editor and paste the contents of `supabase_schema.sql` to create tables and insert dummy data.

### 2. Backend Setup
- Navigate to the `server` directory.
- Create a `.env` file based on the template:
  ```env
  PORT=5000
  SUPABASE_URL=your_supabase_url
  SUPABASE_ANON_KEY=your_supabase_anon_key
  JWT_SECRET=your_jwt_secret
  ```
- Install dependencies: `npm install`
- Run in development mode: `npm run dev`

### 3. Frontend Setup
- Navigate to the `client` directory.
- Install dependencies: `npm install`
- Run in development mode: `npm run dev` (Runs on http://localhost:3000)

## Features & Usage

- **Login**: Use `admin` / `admin` to log in.
- **Leads**: Real-time leads will appear automatically when sent via the `POST /api/leads` endpoint (used by n8n).
- **Plots**: View and manage plot inventory in Table or Grid view.
- **Payments**: Track revenue and transaction history.
- **Dummy Data**: If Supabase is not connected, the system will gracefully fall back to built-in dummy data for testing UI.
