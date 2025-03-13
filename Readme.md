# Food Recipe Finder

## Overview
Food Recipe Finder is a full-stack web application that allows users to browse, add, rate, and vote for food recipes. It is built with a **React (Vite) frontend** and a **Node.js (Express) backend** with a MongoDB database.

## Tech Stack
### Frontend (Client)
- **React (Vite)** - Fast and modern frontend framework
- **TypeScript** - Type safety for better maintainability
- **React Context API / Store** - State management
- **Axios** - API calls handling

### Backend (Server)
- **Node.js (Express)** - Backend framework
- **MongoDB** - Database for storing recipes and user data
- **Mongoose** - ODM for MongoDB
- **JWT Authentication** - Secure user authentication
- **Cors & Middleware** - Error handling and security
- **TypeScript** - For type safety and better code management

## Folder Structure

### Client (`client/src`)
- `components/` - Reusable UI components
  - `Display/` - Components for displaying recipes
  - `Forms/` - Authentication and food forms
  - `ui/` - UI components like Footer, Hero, etc.
- `hooks/` - Custom React hooks
- `store/` - State management (e.g., Redux, Context API)
- `App.tsx` - Main app entry
- `vite.config.ts` - Vite configuration file

### Server (`server/src`)
- `configs/` - Database and CORS configuration
- `controllers/` - Business logic (e.g., `food.controller.ts`, `user.controller.ts`)
- `routes/` - API routes (e.g., `food.route.ts`, `rating.route.ts`)
- `models/` - Mongoose models for MongoDB
- `middlewares/` - Authentication and error handling
- `helpers/` - Utility functions (API responses, error handlers)
- `data/` - Sample data insertion scripts

## Setup & Installation
### Prerequisites
- Node.js (v18+ recommended)
- MongoDB installed or a cloud database like MongoDB Atlas

### Steps
1. **Clone the Repository:**
   ```sh
   git clone https://github.com/walonCode/recipe_finder.git
   cd recipe_finder
   ```
2. **Install Dependencies:**
   ```sh
   cd client && npm install
   cd ../server && npm install
   ```
3. **Set Up Environment Variables:**
   - Create a `.env` file in the `server/` directory and add:
     ```env
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     PORT=5000
     ```
4. **Run the Server:**
   ```sh
   cd server
   npm run dev
   ```
5. **Run the Client:**
   ```sh
   cd client
   npm run dev
   ```
6. **Access the App:** Open `http://localhost:5173` in your browser.

## Features
- **User Authentication** (Register, Login, Profile Management)
- **Recipe Management** (Add, Edit, Delete, View Recipes)
- **Ratings & Voting System**
- **Modern UI with Responsive Design**
- **Secure API with Authentication Middleware**

## Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature-name`)
3. Commit changes (`git commit -m "Added new feature"`)
4. Push to the branch (`git push origin feature-name`)
5. Open a Pull Request

## License
This project is licensed under the **MIT License**.

