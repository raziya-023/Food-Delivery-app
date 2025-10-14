# Feasto - A Full-Stack Food Delivery Application

![Netlify Deployment](https://img.shields.io/badge/Netlify-LIVE-brightgreen?style=for-the-badge&logo=netlify)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-20-green?style=for-the-badge&logo=nodedotjs)
![Express](https://img.shields.io/badge/Express-4-lightgrey?style=for-the-badge&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-4-green?style=for-the-badge&logo=mongodb)

Feasto is a modern, full-stack food delivery web application built with the MERN stack. It provides a seamless experience for users to browse restaurants, view menus, and place orders. The platform also allows restaurant owners to register their business and manage their menu items.

This repository contains the complete source code for both the frontend client and the backend API.

### **Live Application:** [https://feasto-api.netlify.app/](https://feasto-api.netlify.app/)

---

## Preview

<p align="center">
  <img width="1818" height="900" alt="Restaurants preview page" src="https://github.com/user-attachments/assets/c0043cf9-8a4e-4791-8405-8ff8658ebc4c" />
</p>

---

## Core Features

#### **Frontend (Client)**
-   **Restaurant Browsing:** A responsive homepage showcasing featured restaurants with beautiful imagery and essential details.
-   **Dynamic Menu System:** Users can click on any restaurant to view its detailed menu, complete with item descriptions and prices.
-   **Shopping Cart & Ordering:** A fully functional shopping cart where users can add/remove items and view a real-time order summary before checkout.

| Menu Preview | Shopping Cart | Add Restaurant Form |
| :---: | :---: | :---: |
| Browse restaurant menus with detailed dish information, prices, and categories for easy selection. | A complete shopping cart system with item management, quantity controls, and real-time total calculations. | An intuitive form interface for adding new restaurants with all necessary details and configurations. |
| <details><summary>View Screenshot</summary><img width="1815" height="907" alt="Restaurant menu page" src="https://github.com/user-attachments/assets/bf50e7f8-998a-4998-ac6e-b0e5803ce32d" /></details> | <details><summary>View Screenshot</summary><img width="1872" height="893" alt="Shopping Cart Screenshot" src="https://github.com/user-attachments/assets/e5413a56-4216-44b9-9e38-b3e7fc50d029" /></details> | <details><summary>View Screenshot</summary><img width="1869" height="793" alt="Add Restaurant Form" src="https://github.com/user-attachments/assets/011b2120-b517-4d8b-bd14-72496ea0fa74" /></details> |

#### **Backend (Server)**
-   **Secure Authentication:** JWT-based authentication with access tokens stored in httpOnly cookies for enhanced security.
-   **RESTful Endpoints:** Complete CRUD operations for Restaurants, Menu Items, and Users.
-   **Cloud Media Uploads:** Efficiently handles restaurant and food image uploads directly to Cloudinary.
-   **Data Modeling:** Robust data schemas for users, restaurants, and menu items using Mongoose.

---

## Tech Stack

#### **Frontend**
-   **Framework:** React.js (with Vite)
-   **Styling:** Tailwind CSS & Material UI (MUI)
-   **State Management:** Redux Toolkit
-   **Server State & Caching:** TanStack React Query
-   **Routing:** React Router DOM
-   **HTTP Client:** Axios
-   **Notifications:** React Hot Toast

#### **Backend**
-   **Runtime:** Node.js
-   **Framework:** Express.js
-   **Database:** MongoDB (with Mongoose)
-   **Media Storage:** Cloudinary
-   **Authentication:** JWT (JSON Web Tokens) with Cookie-based sessions

---

## API Endpoints

Here are some of the key public and protected routes:

| Method   | Endpoint                             | Description                       | Protected |
| :------- | :----------------------------------- | :-------------------------------- | :-------- |
| `POST`   | `/api/v1/users/register`             | Register a new user               | No        |
| `POST`   | `/api/v1/users/login`                | Log in a user                     | No        |
| `GET`    | `/api/v1/restaurants`                | Get all restaurants               | No        |
| `GET`    | `/api/v1/restaurants/:id`            | Get a single restaurant's details | No        |
| `POST`   | `/api/v1/restaurants`                | Create a new restaurant           | Yes       |
| `POST`   | `/api/v1/menu/:restaurantId`         | Add a menu item to a restaurant   | Yes       |
| `DELETE` | `/api/v1/menu/:itemId`               | Delete a menu item                | Yes       |

---

## Local Development Setup

To run this project locally, you will need to run the client and server in two separate terminal windows.

### Prerequisites
- Node.js (v18 or later)
- npm
- Git
- A MongoDB database (local or cloud-hosted via MongoDB Atlas)

1.  Clone the repository: `git clone https://github.com/raziya-023/Food-Delivery-app`
2.  Navigate to the directory: `cd server` `cd client`
3.  Install dependencies: `npm install`
4.  Run the development server: `npm run dev`
