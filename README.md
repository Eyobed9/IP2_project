# AASTU Clinic Web Application

AASTU Clinic is a modern web application designed to provide exceptional healthcare services to the community. The platform allows users to book appointments, access healthcare services, and manage their profiles.

## Table of Contents

-   [Features](#features)
-   [Technologies Used](#technologies-used)
-   [Installation](#installation)
-   [Usage](#usage)
-   [Folder Structure](#folder-structure)
-   [Contributing](#contributing)
-   [License](#license)

## Features

-   User authentication (Sign up, Sign in, Logout)
-   Role-based access for patients and doctors
-   Appointment booking system
-   Comprehensive services listing
-   Contact form for inquiries
-   Responsive design for all devices

## Technologies Used

-   **Frontend**: React, TypeScript, Tailwind CSS
-   **Backend**: PHP (REST API)
-   **Database**: MySQL
-   **Other Libraries**: Axios, React Router, React Icons

## Installation

### Prerequisites

-   Node.js and npm installed
-   PHP and MySQL server (e.g., XAMPP)

### Steps

1. Clone the repository:

    ```bash
    git clone https://github.com/your-repo/aastu-clinic.git
    cd aastu-clinic/frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npm start
    ```

4. Ensure the backend is running on `http://localhost:8080`.

## Usage

-   Navigate to `http://localhost:3000` in your browser.
-   Sign up as a patient or doctor.
-   Explore services, book appointments, or contact the clinic.

## Folder Structure

```
frontend/
├── src/
│   ├── components/       # Reusable components
│   ├── pages/            # Application pages
│   ├── assets/           # Static assets (images, icons)
│   ├── hooks/            # Custom React hooks
│   ├── App.tsx           # Main application entry
│   └── index.tsx         # React DOM entry point
├── public/               # Public files
├── package.json          # Project dependencies
└── README.md             # Documentation
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch:
    ```bash
    git checkout -b feature-name
    ```
3. Commit your changes:
    ```bash
    git commit -m "Add feature-name"
    ```
4. Push to your branch:
    ```bash
    git push origin feature-name
    ```
5. Open a pull request.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
