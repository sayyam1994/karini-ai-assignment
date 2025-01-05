# Karini AI Assignment

A full-stack simple e-commerce application with shopping cart feature built with Next.js and NestJS.

## Live demo

https://karini-ai-assignment.vercel.app/

## Project Structure

The project is divided into two main parts:

client

- Frontend application built with Next.js

server

- Backend API built with NestJS

## Frontend (client)

### Tech Stack

- Next.js 15.1.3
- React 19
- TailwindCSS
- Radix UI Components
- React Query
- Sonner (for toasts)
- TypeScript

### Features

- Modern UI: Responsive design using TailwindCSS.
- Product Catalog: Display a list of products with details.
- Shopping Cart: Add, remove, and clear items in the cart.
- Search Functionality: Search products by SKU or name.
- Dark/Light Theme: Toggle between dark and light themes.
- Toast Notifications: Display notifications using Sonner.
- Client-side State Management: Manage state using React Query.
- Server-side Rendering: Implemented with Next.js.
- Image Handling: Handle image loading and errors.

### Getting Started

#### To run this locally follow

```bash
cd client

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

The frontend application will be running at [http://localhost:3000](http://localhost:3000).

## Backend (server)

### Tech Stack

- NestJS
- TypeScript
- MongoDB

### Features

- RESTful API: Expose endpoints for frontend consumption.
- Database Integration: Connect to MongoDB for data storage.
- Environment Configuration: Manage environment variables.
- Testing: Unit and integration tests for API endpoints.

### Getting Started

#### To run this locally follow

```bash
cd server

# Install dependencies
npm install

# Run in development mode
npm run start:dev

# Run in production mode
npm run start:prod

# Run tests
npm run test
```

The API server will be running at [http://localhost:3001](http://localhost:3001).

## Environment Variables

### Client

Create a `.env.local` file in the client directory:

```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Server

Create a `.env` file in the server directory:

```
MONGODB_URI=mongodb://localhost:27017/mydatabase
PORT=3001
```

## Testing

```bash
# Backend tests
cd server
npm run test
```
