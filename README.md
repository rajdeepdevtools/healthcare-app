# DEVI Homeopathy Clinic

Welcome to the DEVI Homeopathy Clinic web application project. This project is built using the MERN stack (MongoDB, Express.js, React.js, Node.js) and aims to provide a comprehensive platform for homeopathy services.

## Project Structure

The project is divided into two main parts: the backend and the frontend.

### Backend

The backend is built with Node.js and Express.js and is responsible for handling API requests, connecting to the MongoDB database, and managing business logic.

- **src/app.js**: Entry point of the backend application.
- **src/config/db.js**: Database configuration and connection logic.
- **src/controllers/index.js**: Controller functions for handling business logic.
- **src/models/index.js**: Mongoose models defining the database schema.
- **src/routes/index.js**: Route definitions linking to controller functions.
- **src/utils/index.js**: Utility functions for error handling and data formatting.

### Frontend

The frontend is built with React.js and Vite, providing a responsive and user-friendly interface for users to interact with the clinic's services.

- **src/components/index.jsx**: Reusable React components.
- **src/pages/index.jsx**: Main page component for the application.
- **src/App.jsx**: Main application component for routing and layout.
- **src/main.jsx**: Entry point for the React application.
- **src/styles/index.css**: Global styles and Tailwind CSS configurations.

## Features

- Fully responsive design for optimal viewing on various devices.
- SEO-friendly structure to enhance visibility on search engines.
- User-friendly interface for easy navigation and access to services.
- Integration with MongoDB for data management.

## Setup Instructions

### Backend

1. Navigate to the `backend` directory.
2. Install dependencies:
   ```
   npm install
   ```
3. Start the server:
   ```
   npm start
   ```

### Frontend

1. Navigate to the `frontend` directory.
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.