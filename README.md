# 👕 Wardrobe AI

Wardrobe AI is an AI-powered smart wardrobe management application that helps users organize their clothing, get outfit recommendations, and manage their wardrobe efficiently. The platform uses modern full-stack technologies with secure authentication and scalable architecture.

---

## 🚀 Features

* 🔐 User Authentication & Authorization using **JWT Tokens**
* 👚 Add, update, delete, and manage wardrobe items
* 🤖 AI-based outfit recommendations (future-ready)
* 📸 Upload and categorize clothing items
* 🧠 Smart tagging (color, type, season, occasion)
* 📊 Personalized dashboard
* 🔍 Search and filter wardrobe items
* ☁️ Scalable REST API architecture

---

## 🛠️ Tech Stack

### Frontend

* **React.js**
* Axios (API calls)
* React Router
* CSS / Tailwind / Bootstrap (optional)

### Backend

* **Node.js**
* **Express.js**
* RESTful APIs

### Database

* **MongoDB** (NoSQL)
* Mongoose ODM

### Authentication & Security

* **JWT (JSON Web Token)**
* bcrypt for password hashing
* Protected routes & middleware

---

## 📁 Project Structure

```
wardrobe-ai/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/wardrobe-ai.git
cd wardrobe-ai
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Run backend server:

```bash
npm start
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend will run at: `http://localhost:3000`
Backend will run at: `http://localhost:5000`

---

## 🔐 Authentication Flow (JWT)

1. User registers/logs in
2. Server generates a JWT token
3. Token is stored on client (localStorage/sessionStorage)
4. Token is sent in headers for protected API routes

Example Header:

```
Authorization: Bearer <token>
```

---

## 📌 API Endpoints (Sample)

### Auth Routes

* `POST /api/auth/register` – Register user
* `POST /api/auth/login` – Login user

### Wardrobe Routes

* `POST /api/wardrobe/add`
* `GET /api/wardrobe`
* `PUT /api/wardrobe/:id`
* `DELETE /api/wardrobe/:id`

---

## 🔮 Future Enhancements

* AI outfit recommendation engine
* Image-based clothing detection
* Weather-based outfit suggestions
* Mobile app integration
* Social sharing of outfits

---

## 👨‍💻 Author

* **Vaibhav kale**
* Engineer | Full Stack Developer

---

## 📄 License

This project is licensed under the MIT License.

---

⭐ If you like this project, don’t forget to star the repository!
