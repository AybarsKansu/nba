# NBA Stats Application

A comprehensive full-stack web application for managing and analyzing NBA statistics. This project provides a robust platform for tracking player performance, team standings, and generating advanced statistical reports using a modern tech stack.

## Table of Contents

- [Introduction](#introduction)
- [Technologies](#technologies)
- [Features](#features)
- [Installation & Setup](#installation--setup)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage](#usage)

## Introduction

The NBA Stats Application is designed to provide basketball enthusiasts and analysts with deep insights into the game. It combines a powerful Spring Boot backend with a dynamic React frontend to deliver real-time data visualization, player profiles, and complex statistical queries like Triple-Double tracking, Efficiency ratings, and Defensive Leaders.

## Technologies

### Backend
- **Language:** Java 21+
- **Framework:** Spring Boot 3.x
- **Database:** MySQL
- **ORM:** Hibernate / Spring Data JPA
- **Security:** Spring Security with JWT Authentication
- **Build Tool:** Maven

### Frontend
- **Framework:** React.js (Vite)
- **UI Library:** Material UI (MUI)
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **Routing:** React Router DOM

## Features

- **Advanced Statistical Analysis:**
  - **Triple-Double & Double-Double Tracker:** Identify players with outstanding multi-category performances (including Steals & Blocks).
  - **Efficiency Analysis:** Shooting efficiency (TS%, eFG%) and player efficiency ratings.
  - **Leaderboards:** Top performers in Points, Rebounds, Assists, Steals, and Blocks.
  - **Team Performance:** Season-long team stats including wins and points scored/allowed.

- **Player & Team Management:**
  - Detailed Player Profiles with season-by-season stats and game logs.
  - Team rosters and historical data.
  - Career Awards tracking (MVP, DPOY, etc.).

- **Admin Dashboard:**
  - CRUD operations for Players, Teams, and Games.
  - **Audit Logging:** Track all administrative actions for security and accountability.

- **User Features:**
  - Secure Login and Registration.
  - Favorite Players list (implied feature).

## Installation & Setup

### Prerequisites
- Java Development Kit (JDK) 17 or higher
- Node.js (v18 or higher)
- PostgreSQL Database
- Maven

### Backend Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/nba-stats-app.git
    cd nba-stats-app
    ```

2.  **Configure the Database:**
    - Create a PostgreSQL database named `nba_db`.
    - Update `src/main/resources/application.properties` with your database credentials:
        ```properties
        spring.datasource.url=jdbc:postgresql://localhost:5432/nba_db
        spring.datasource.username=your_username
        spring.datasource.password=your_password
        ```

3.  **Build and Run:**
    ```bash
    ./mvnw clean install
    ./mvnw spring-boot:run
    ```
    The backend server will start on `http://localhost:8080`.

### Frontend Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd src/main/frontend/nba-frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be accessible at `http://localhost:5173`.

## Usage

1.  Register a new account or login with existing credentials.
2.  Navigate to the **Dashboard** to view quick stats and access **Advanced Analysis**.
3.  Use the **Players** and **Teams** tabs to browse the database.
4.  (Admin) Access the **Admin Panel** to manage data and view audit logs.
