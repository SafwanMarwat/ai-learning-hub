# AI Learning Hub 🚀

A modern, high-performance blog platform built with React, Vite, and Firebase.

## 🌟 Features
- **Premium Design**: "Whimsical" interactions, dark mode, and responsive layout.
- **Custom CMS**: Full Admin Panel to write, edit, and manage posts.
- **Smart Placeholders**: The site is never empty; it shows demo content until you publish your own.
- **Monetization Ready**: Integrated Admin Settings for Google AdSense and Social Media links.

## 🛠️ Setup & Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## 🔐 Admin Access
To access the CMS dashboard:
- **URL**: `http://localhost:5173/admin/login`
- **Email**: `admin@aiearninghub.com`
- **Password**: `admin123`

## ☁️ Firebase Configuration
This project uses Firebase for data and image storage.
1. Create a project at [console.firebase.google.com](https://console.firebase.google.com).
2. Create a `.env` file based on `.env.example`.
3. Copy `firestore.rules` and `storage.rules` to your Firebase console security rules.

## 📂 Project Structure
- `/src/pages` - Application routes and views.
- `/src/components` - Reusable UI components.
- `/src/context` - State management (Blog handling, Auth).
- `/src/data` - Placeholder data logic.

---
*Generated for AI Learning Hub Project*
