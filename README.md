# 🛍️ Bloom — Full Stack E-Commerce Platform

Bloom is a modern, full-stack e-commerce platform built with the **MERN stack**. It provides a complete online shopping experience with user authentication, product discovery, category filtering, shopping cart management, checkout, order tracking, and a role-based admin dashboard.

The project is designed with a responsive and modern UI and follows a scalable frontend/backend architecture.

---

## 🌐 Live Demo

🔗 **Live Website:**  
https://bloom-seven-alpha.vercel.app/

🔗 **GitHub Repository:**  
https://github.com/RashedujjamanNoor/bloom

---

## 📸 Screenshots

> Add your project screenshots here.

### 🏠 Homepage

![Bloom Homepage](./screenshots/homepage.png)

### 🛍️ Admin Product Page

![Product Page](./screenshots/admin-product.png)

### 🛒 Admin Order

![Shopping Cart](./screenshots/admin-order.png)

### 📦 My Orders

![My Orders](./screenshots/user-order.png)

### 👨‍💼 Admin Analitics

![Admin Dashboard](./screenshots/admin-analitics.png)

---

# ✨ Features

## 👤 Customer Features

- User registration and authentication
- Google authentication with Firebase
- Secure JWT-based authentication
- Browse products
- Product details page
- Product image gallery
- Size selection
- Color selection
- Category-based product browsing
- Men / Women / Kids product filtering
- Brand filtering
- Price filtering
- Product sorting
- Related products
- Add products to cart
- Product quantity management
- Remove products from cart
- Checkout page
- Delivery information
- Cash on Delivery option
- Place orders
- View personal orders
- Track order status
- Cancel eligible orders
- Responsive design for mobile, tablet and desktop

---

# 👨‍💼 Admin Features

Bloom includes a role-based admin dashboard for managing the store.

### Dashboard

- Store overview
- Total products
- Total orders
- Users
- Revenue information

### Product Management

- Add products
- Edit products
- Delete products
- Upload product images
- Manage product price
- Manage stock
- Manage sizes
- Manage colors
- Manage categories
- Manage brands

### Order Management

- View all orders
- View order details
- Update order status
- Monitor order information

### User Management

- View registered users
- Manage user information

---

# 🧰 Tech Stack

## Frontend

| Technology | Purpose |
|---|---|
| React.js | Frontend UI |
| React Router | Client-side routing |
| Redux Toolkit | Global state management |
| Tailwind CSS | Styling |
| DaisyUI | UI components |
| Axios | API communication |
| Firebase | Google Authentication |
| React Icons | Icons |
| React Toastify | Notifications |
| SweetAlert2 | Confirmation dialogs |
| Swiper.js | Product sliders |

## Backend

| Technology | Purpose |
|---|---|
| Node.js | Backend runtime |
| Express.js | REST API |
| MongoDB | Database |
| Mongoose | MongoDB ODM |
| JWT | Authentication |
| Firebase Admin | Firebase authentication verification |
| Cloudinary | Image storage |
| Multer | File handling |
| bcrypt | Password security |
| dotenv | Environment variables |

---

# 🏗️ Project Architecture

Bloom follows a separated frontend/backend architecture.

```text
Bloom
│
├── frontend
│   ├── components
│   ├── pages
│   ├── layouts
│   ├── features
│   ├── services
│   ├── routes
│   ├── firebase
│   └── api
│
└── backend
    ├── controllers
    ├── models
    ├── routes
    ├── middleware
    ├── services
    ├── config
    ├── utils
    └── server.js
