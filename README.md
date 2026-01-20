# Teacher Training Platform

## Overview
The Teacher Training Platform is a web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) designed to facilitate teacher training through structured training plans and role-based access. The application includes features such as JWT authentication, user roles, and AI-driven training planning.

## Features
- **User Authentication**: Secure login and registration using JWT.
- **Role-Based Access**: Different access levels for Admins, Trainers, and Trainees.
- **Training Management**: Create, view, and manage training plans.
- **AI Training Planner**: Simple AI logic to generate training plans based on classroom issues.
- **Responsive Design**: User-friendly interface for all devices.

## Setup Instructions

### Prerequisites
- Node.js and npm installed
- MongoDB instance running

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd teacher-training-platform
   ```

2. Install server dependencies:
   ```
   cd server
   npm install
   ```

3. Install client dependencies:
   ```
   cd ../client
   npm install
   ```

4. Set up environment variables:
   - Copy `.env.example` to `.env` in both the `server` and `client` directories and update the values as needed.

5. Start the server:
   ```
   cd ../server
   npm start
   ```

6. Start the client:
   ```
   cd ../client
   npm start
   ```

## Usage
- Access the application at `http://localhost:3000`.
- Use the login and registration features to create an account and access the platform.
- Admins can manage users and training plans, while Trainers can create and view training plans. Trainees can view their assigned training.

## Testing
- Run tests for the server:
  ```
  cd server
  npm test
  ```

## Documentation
For detailed architecture and design decisions, refer to the `docs/architecture.md` file.

## License
This project is licensed under the MIT License.