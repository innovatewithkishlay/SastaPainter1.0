# API Documentation

Base URL: `/api/v1`

## Authentication
All protected routes require a Bearer Token in the `Authorization` header.
`Authorization: Bearer <your_jwt_token>`

## Endpoints

### Public Routes
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/services` | Get all services (Cached) |
| `GET` | `/reviews/public` | Get all public reviews (Cached) |
| `POST` | `/auth/register` | Register a new user |
| `POST` | `/auth/login` | Login user |
| `POST` | `/auth/google` | Login with Google |
| `POST` | `/auth/admin-login` | Admin login |
| `POST` | `/book` | Create a new booking inquiry |
| `POST` | `/site-visit` | Request a site visit |

### User Routes (Protected)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/user/my-bookings` | Get logged-in user's bookings |
| `GET` | `/user/profile` | Get logged-in user's profile |
| `PUT` | `/user/profile` | Update user profile |
| `POST` | `/user/reviews` | Submit a review |

### Admin Routes (Protected + Admin Only)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/admin/dashboard-stats` | Get dashboard statistics |
| `GET` | `/admin/users` | Get all users |
| `DELETE` | `/admin/users/:id` | Delete a user |
| `GET` | `/admin/bookings` | Get all bookings |
| `PUT` | `/admin/bookings/:id/status` | Update booking status |
| `GET` | `/admin/site-visits` | Get all site visits |
| `PUT` | `/admin/site-visits/:id/status` | Update site visit status |
| `GET` | `/admin/painters` | Get all painters |
| `POST` | `/admin/painters` | Add a new painter |
| `DELETE` | `/admin/painters/:id` | Delete a painter |
| `PUT` | `/admin/bookings/:id/assign` | Assign a painter to a booking |

## Response Format
All responses follow this standard format:

**Success:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

**Error:**
```json
{
  "success": false,
  "error": "Error message description"
}
```

## Health Check
`GET /health`
Returns server status, uptime, and environment.
