# Hospital Food Delivery Management System

## Tech Stack

### Frontend:
- **Next.js**: A React framework for building modern web applications. It provides server-side rendering, static site generation, and API routes, making it an ideal choice for building fast, SEO-friendly applications.
- **Tailwind CSS**: A utility-first CSS framework for creating custom designs without writing custom CSS. It allows rapid UI development with minimal hassle.
- **TypeScript**: A statically typed superset of JavaScript that helps to prevent runtime errors, improves code quality, and offers better development tooling with autocompletion.

### Backend:
- **Next.js API Routes**: We utilize the built-in API routes in Next.js to create the backend endpoints for handling patient data, diet plans, pantry management, etc.
- **MongoDB**: A NoSQL database to store patient information, diet details, pantry assignments, etc.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js. It helps in modeling data and interacting with MongoDB using JavaScript.
- **JWT (JSON Web Token)**: Used for managing user sessions in a stateless manner.

### Authentication:
- **NextAuth.js**: A easy-to-use authentication library for Next.js. It supports various authentication providers, including credentials-based login (email/password).

## Features
- **Patient Management**: Add, update, and display patients.
- **Diet Management**: Create and manage personalized diet plans for patients.
- **Pantry Management**: Assign pantries to patients for meal deliveries.
- **User Authentication**: Sign in users using email/password (credentials-based login).
- **Role-Based Access**: Different roles for users (Admin, Staff, Pantry).
