# 💰 ExpenseEase - MERN Stack Expense Tracker
**ExpenseEase** is a fully responsive Expense Tracker App built using the **MERN Stack** .  
This is a **learning project** I completed by following a YouTube tutorial to understand how the MERN stack works together in real-world apps.

---

## 📋 Features

- ✅ **User Authentication** (Login/Register with JWT)
- 📊 **Dashboard Overview** with total balance, income, and expenses
- ➕ **Add & Manage Income and Expenses**
- 📁 **Export Income/Expenses as Excel Files**
- 📅 **Recent Transactions View**
- 📉 **Interactive Charts** using Recharts (Bar, Line, Pie)
- 📱 **Fully Responsive** – Works on mobile, tablet, and desktop
- 🗑️ **Delete Records Easily** with a hover delete button
- 🧭 **Simple Navigation** with a sidebar for all pages

---

## 🚀 Tech Stack
- **Frontend**: React.js + Tailwind CSS
- **Backend**: Node.js + Express.js
- **Database**: MongoDB Atlas
- **Authentication**: JWT (JSON Web Token)
- **Chart Library**: Recharts

  ---

## ⚙️ How to Run This Project

1. **Clone the repository**
   ```bash
   git clone https://github.com/tanurims/expenseease.git
   cd expenseease
   cd backend
   npm install
   ```

2. **Add .env File in Backend Folder**
```bash
   PORT=8000
   MONGODB_URI=your_mongo_db_uri
   JWT_SECRET=your_jwt_secret
   ```
3. **Start the Backend**
```bash
   npm run dev
```

4. **Install Frontend Dependencies and Run**
   ```bash
   cd ../frontend/expense-ease
   npm install
   npm run dev
   ```


