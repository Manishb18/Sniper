# URL Shortener

A simple URL shortener application with a Next.js frontend and Express.js backend.

## Features

- Shorten long URLs into manageable links
- View and track click statistics
- Copy shortened URLs to clipboard with one click
- Responsive design for mobile and desktop
- Recent URL history

## Project Structure

This project consists of two main parts:

- **Frontend**: Built with Next.js and Tailwind CSS
- **Backend**: Built with Express.js, MongoDB, and Node.js

## Setup and Installation

### Prerequisites

- Node.js (v14 or later)
- MongoDB (local or remote instance)

### Backend Setup

1. Navigate to the backend directory
   ```
   cd backend
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Create a `.env` file with the following variables
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/url-shortener
   BASE_URL=http://localhost:5000
   ```

4. Start the development server
   ```
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory
   ```
   cd frontend
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the development server
   ```
   npm run dev
   ```

## Usage

1. Open your browser and go to `http://localhost:3000`
2. Enter a long URL in the input field
3. Click "Shorten URL"
4. Copy the shortened URL and share it

## API Endpoints

- **POST /api/shorten**: Create a short URL
- **GET /api/:code**: Redirect to the original URL
- **GET /api/urls/all**: Get all URLs

## Technologies Used

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend
- Express.js
- MongoDB with Mongoose
- Node.js

## License

This project is licensed under the MIT License. 