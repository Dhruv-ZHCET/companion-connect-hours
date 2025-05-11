
# Rent-a-Companion Server

This is the backend server for the Rent-a-Companion application.

## Setup

1. Install dependencies:
```
cd server
npm install
```

2. Set up your PostgreSQL database and update the `.env` file with your database connection string.

3. Run Prisma migrations to create the database schema:
```
npx prisma migrate dev --name init
```

4. Generate Prisma client:
```
npx prisma generate
```

5. Start the development server:
```
npm run dev
```

## API Endpoints

### Users
- GET /api/users - Get all users
- GET /api/users/:id - Get user by ID
- POST /api/users - Create a new user
- PUT /api/users/:id - Update a user

### Companions
- GET /api/companions - Get all companions
- GET /api/companions/:id - Get companion by ID

### Bookings
- GET /api/bookings/user/:userId - Get all bookings for a user
- POST /api/bookings - Create a new booking
- PATCH /api/bookings/:id/status - Update a booking status

## Database Schema

The database schema is defined in `prisma/schema.prisma` and includes the following models:
- User
- Interest
- Language
- Availability
- Booking

## Technologies Used

- Node.js with Express
- Prisma ORM
- PostgreSQL
- TypeScript
