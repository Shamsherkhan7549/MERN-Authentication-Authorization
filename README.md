# 🔐 MERN JWT Authentication

This project demonstrates how to implement **JWT (JSON Web Token) authentication** in a **MERN (MongoDB, Express, React, Node.js)** application.  
It includes **user signup, login, protected routes, and token verification** on both backend and frontend.

---

## 📌 Features
- User **signup & login**
- Password hashing using **bcrypt**
- Token-based authentication with **JWT**
- Protected routes using middleware
- Token storage in **localStorage** (for demo) or **HTTP-only cookies** (recommended)
- Full **MERN stack** integration (MongoDB + Express + React + Node)

---

## 🔑 What is JWT?
**JWT (JSON Web Token)** is a secure way to transmit information between client and server.  

A JWT has three parts:
1. **Header** – contains algorithm & token type  
2. **Payload** – contains user data (e.g., `id`, `email`)  
3. **Signature** – verifies integrity of the token  

Example:
