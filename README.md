# LENS

## Overview

LENS is a photography platform where users can discover photographers, explore their profiles and portfolios, and send booking requests. Photographers can create profiles, share photography posts, and manage booking requests.

## Screenshots

### Home Page

![Home Page](screenshots/home.png)

### Photographers

![Photographers](screenshots/photographers.png)

### Photographer Profile

![Photographer Profile](screenshots/profile.png)

### Booking Requests

![Booking Requests](screenshots/bookings.png)

## Technologies Used

* HTML
* CSS
* JavaScript
* Node.js
* Express.js
* MongoDB
* Mongoose
* EJS
* Express Session
* Bcrypt
* Multer
* Method Override

## Getting Started

### Requirements

* Node.js
* MongoDB
* VS Code

### Installation

1. Clone the repository.
2. Open the project folder in VS Code.
3. Install the dependencies:

```bash
npm install
```

4. Create a `.env` file in the project root.

5. Add your environment variables:

```env
MONGODB_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
```

6. Start the application:

```bash
node server.js
```

7. Open the application in your browser:

```text
http://localhost:3000
```

## User Stories

### Users

* As a user, I want to create an account.
* As a user, I want to sign in and sign out.
* As a user, I want to browse photographers.
* As a user, I want to view photographer profiles.
* As a user, I want to view photographer portfolios.
* As a user, I want to send a booking request.
* As a user, I want to view my bookings and their status.

### Photographers

* As a photographer, I want to create an account.
* As a photographer, I want to create and edit my profile.
* As a photographer, I want to upload photography posts.
* As a photographer, I want to edit and delete my posts.
* As a photographer, I want to view booking requests.
* As a photographer, I want to accept or reject booking requests.

## Database Design

The application uses MongoDB and Mongoose.

### User

Stores account information, account type, profile picture, bio, and photography style.

### Post

Stores photography posts created by photographers.

### Booking

Stores booking requests between users and photographers, including the date, message, and booking status.

### ERD

![LENS ERD](./public/images/erd.png)

## Routes

| Method | Route                           | Description                        |
| ------ | ------------------------------- | ---------------------------------- |
| GET    | `/`                             | Home page                          |
| GET    | `/photographers`                | View all photographers             |
| GET    | `/auth/sign-up`                 | Sign-up page                       |
| POST   | `/auth/sign-up`                 | Create an account                  |
| GET    | `/auth/sign-in`                 | Sign-in page                       |
| POST   | `/auth/sign-in`                 | Sign in                            |
| GET    | `/auth/sign-out`                | Sign out                           |
| GET    | `/profile`                      | View own profile                   |
| GET    | `/profile/edit`                 | Edit profile form                  |
| PUT    | `/profile`                      | Update profile                     |
| GET    | `/profile/:userId`              | View photographer profile          |
| GET    | `/posts`                        | View photographer's portfolio      |
| GET    | `/posts/new`                    | New post form                      |
| POST   | `/posts`                        | Create post                        |
| GET    | `/posts/:id/edit`               | Edit post form                     |
| PUT    | `/posts/:id`                    | Update post                        |
| DELETE | `/posts/:id`                    | Delete post                        |
| GET    | `/bookings/new/:photographerId` | New booking form                   |
| POST   | `/bookings`                     | Create booking                     |
| GET    | `/bookings/my-bookings`         | View user's bookings               |
| GET    | `/bookings/requests`            | View photographer booking requests |
| PUT    | `/bookings/:bookingId/accept`   | Accept booking                     |
| PUT    | `/bookings/:bookingId/reject`   | Reject booking                     |

## Features

* Role-based access control (photographer and user roles)
* Protected role-specific routes
* Image uploads
* Custom LENS logo and website icon


## Future Enhancements

* Add photographer reviews and ratings
* Add search and filtering for photographers
* Add messaging between users and photographers
* Add booking availability and calendar features
* Add notifications for booking updates

## Credits

Developed as a web development project using Node.js, Express, MongoDB, Mongoose, and EJS.
