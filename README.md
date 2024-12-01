# 🏦 **Currency Converter**

This project is an exchange rate converter application with management tools and a conversion history, developed using the **MERN (MongoDB, Express, React, Node)** stack. It follows the **MVC (Model-View-Controller)** pattern to ensure a clear separation of business logic, user interface, and control flow, promoting better organization, scalability, and maintainability.

---
## Screenshot
![image](https://github.com/user-attachments/assets/e90fede7-f940-4418-88d6-f8d0d868200a)

---
### 🌟 **Key Features**
- **Currency Conversion:** Accurately converts between currencies using updated exchange rates.
- **Management of Currencies, Rates, and Institutions:** Allows the administration of currencies, exchange rates, and financial providers.
- **Exchange Rate History:** Tracks how exchange rates have changed over time.
- **Conversion History:** Maintains detailed records of performed conversions, including the purpose.
- **User Roles:**
  - **Administrator:** Full access to manage the system.
  - **User:** Limited access to perform conversions and view histories.

---

### 🛠️ **Technologies Used**
- **MongoDB:** Database for storing information about currencies, rates, conversions, and users.
- **Express.js:** Framework for building a scalable and efficient backend API.
- **React:** Library for developing the interactive frontend.
- **Node.js:** Runtime environment for the backend.
- **MVC:** Architectural pattern for better code organization and maintenance.

---

### 📂 **Project Structure**
#### **Backend:**
- **Controllers:** Manage business logic for entities like currencies, rates, institutions, and users.
- **Models:** Represent entities and their relationships in the MongoDB database.
- **Routes:** Define endpoints to interact with the system's functionalities.

#### **Frontend:**
- **Components:** Modular interface organized by functionality (conversion, management, history).
- **Dynamic Views:** React ensures a fast and seamless user experience.

---

### ⚙️ **Installation and Setup**
1. **Clone the repository:**
   ```bash
   git clone https://github.com/RichardFelic/currency-converter.git
   ```
2. **Install backend and frontend dependencies:**
   ```bash
   cd backend
   npm install       # For the backend
   cd frontend
   npm install       # For the frontend
   ```
3. **Configure environment variables:**
   Create a `.env` file in the project's root directory with the following variables:
   ```
   ## Environment variables

   # App port number
   PORT=3000

   # Database URI
   MONGODB_URI=mongodb+srv://exampleUser:examplePassword@cluster0.mongodb.net/exchangeRate?retryWrites=true&w=majority

   # JWT secret key
   JWT_SECRET=exampleSecretKey

   # NodeMailer credentials
   EMAIL_USER=example@example.com
   EMAIL_PASS=exampleAppPassword

   # Base URL
   BASE_URL=http://localhost:3000
   ```
4. **Start the project:**
   - **Backend:** 
     ```bash
     npm run server
     ```
   - **Frontend:** 
     ```bash
     cd client
     npm start
     ```
---

### 💻 **Contributors**
This project was collaboratively developed by a dedicated team of developers, combining efforts to bring this application to life.

---

✨ Thank you for your interest in our project!
