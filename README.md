# 💰 SmartSaver: Your BudgetBuddy

SmartSaver is a smart expense tracker and personalized deal finder app designed to help users understand their spending habits, manage their budgets effectively, and get the best deals from top platforms in shopping, food, travel, and entertainment.

---

## 📌 Project Description

SmartSaver is built to simplify money management for users by combining intuitive visualizations, real-time expense tracking, and automatic deal recommendations. It leverages Optical Character Recognition (OCR) to digitize expenses from physical receipts and uses intelligent filtering to categorize and analyze spending patterns. In addition, SmartSaver helps users save more by finding the best deals across popular apps and platforms in various categories like shopping, food delivery, travel, and streaming services.

Whether you're a student trying to stay on budget, a professional managing monthly expenses, or just someone looking for better deals, SmartSaver serves as your intelligent finance assistant — all in one platform.

---

## 🚀 Features

### 🧾 Expense Tracker
- Upload receipts and extract expenses using OCR (Tesseract.js)
- Automatically detect and extract amount using RegEx
- Categorize expenses (Food, Travel, Shopping, Bills, etc.)
- Filter by date, category, and platform (UPI, Card, etc.)
- Visual representation using Pie, Bar, and Line charts

### 🛍️ Best Deal Finder
- Discover best prices across:
  - 🛒 Amazon, Flipkart, Meesho, Myntra
  - 🍔 Zomato, Swiggy, Dominos, FoodPanda
  - 🚕 Uber, Ola, Rapido
  - 📺 Netflix, Prime, Hotstar, Aha
- Search & filter by category and platform

### 👤 User Authentication
- Firebase-based secure login/signup/logout
- User-specific expense and deal tracking

### 📊 Dashboard
- Monthly overview with charts
- Fully responsive layout

---

## 🛠️ Tech Stack

| Category    | Tools Used                           |
|-------------|--------------------------------------|
| Frontend    | React.js, HTML5, CSS3, JavaScript    |
| Backend     | Firebase (Firestore, Auth, Storage)  |
| OCR         | Tesseract.js                         |
| Charting    | Chart.js / Recharts                  |

---

## 📁 Folder Structure

SmartSaver/
├── public/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Pages like Dashboard, Login, Signup
│   ├── styles/         # CSS and theme styles
│   ├── firebase.js     # Firebase config and setup
│   └── App.jsx         # Main app routing
├── package.json
├── README.md
└── index.html

---

## ⚙️ Getting Started

### 1. Clone the Repository
git clone https://github.com/SuprajaBiradar/SmartSaver.git
cd SmartSaver

### 2. Install Dependencies
npm install

### 3. Configure Firebase
Go to Firebase Console
Create a project and enable:
Firestore
Authentication (Email/Password)
Storage
Replace the config in firebase.js with your Firebase credentials

### 4. Run the App
npm run dev

