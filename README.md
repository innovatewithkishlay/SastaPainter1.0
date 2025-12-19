# Sasta Painter 2.0

A comprehensive platform for booking painting services, managing projects, and connecting with professional painters.

## Features
- **User Booking System**: Book painting services and site visits.
- **Admin Dashboard**: Manage users, bookings, painters, and view statistics.
- **Authentication**: Secure JWT-based authentication with Google Login support.
- **Role-based Access**: Separate portals for Users and Admins.

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: JWT, Google OAuth
- **Deployment**: Render (Backend), Vercel/Netlify (Frontend - TBD)

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- MongoDB (Local or Atlas)

### Installation

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd "sasta painer2"
    ```

2.  **Backend Setup**
    ```bash
    cd backend
    npm install
    ```
    - Create a `.env` file in the `backend` directory (see Environment Variables below).
    - Start the server:
      ```bash
      npm run dev
      ```

3.  **Frontend Setup**
    ```bash
    cd client
    npm install
    ```
    - Start the development server:
      ```bash
      npm run dev
      ```

## Environment Variables

Create a `.env` file in the `backend` directory with the following:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/aapkapainter
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
CLIENT_URL=http://localhost:5173
GOOGLE_CLIENT_ID=your_google_client_id
```

## API Documentation
Detailed API documentation is available in [backend/API_DOCS.md](backend/API_DOCS.md).

## Project Structure
- `client/`: React Frontend
- `backend/`: Node.js/Express Backend
  - `config/`: Centralized configuration
  - `controllers/`: Request handlers
  - `middleware/`: Auth, Validation, Rate Limiting
  - `models/`: Mongoose Schemas
  - `routes/`: API Routes (v1)
  - `services/`: Business logic (Auth)
