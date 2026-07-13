# ⚖️ NyayaAI - AI Powered Indian Legal Assistant

NyayaAI is an AI-powered legal assistant designed to provide users with quick, easy-to-understand legal information related to Indian laws. It leverages Large Language Models (LLMs) through the Groq API to answer legal queries in both **English** and **Hindi**, making legal knowledge more accessible to everyone.

> **Disclaimer:** NyayaAI provides informational and educational guidance only. It is not a substitute for professional legal advice.

---

## 🚀 Features

- 🤖 AI-powered legal chatbot
- 🇮🇳 Specialized for Indian laws
- 🌐 Supports English & Hindi
- 📚 Explains legal concepts in simple language
- ⚖️ Mentions relevant Acts and Sections
- 🚔 Provides applicable punishments/penalties
- 💡 Suggests next legal steps
- 💬 Stores user chat history
- 🔐 Secure JWT Authentication
- 👤 User Registration & Login

---

## 🛠 Tech Stack

### Frontend
- React.js
- HTML5
- CSS3
- JavaScript
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt.js

### AI Integration
- Groq API
- Llama 3.3 70B Versatile

---

## 📂 Project Structure

```
NyayaAI
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── package.json
│   └── server.js
│
├── README.md
└── .gitignore
```

---

## ✨ How It Works

1. User logs into the application.
2. User asks a legal question.
3. The backend sends the query to the Groq AI model.
4. AI analyzes the query.
5. The chatbot responds with:
   - Simple Explanation
   - Relevant Indian Laws
   - Applicable Sections
   - Punishment (if any)
   - Suggested Next Steps
6. Chat history is securely stored in MongoDB.

---

## ⚙️ Installation

### Clone the Repository

```bash
git clone https://github.com/neerajahirwar225/NyayaAI.git
```

```bash
cd NyayaAI
```

---

## Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder.

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GROQ_API_KEY=your_groq_api_key
```

Run backend

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm start
```

or (if using Vite)

```bash
npm run dev
```

---

## 📸 Screenshots

> Add screenshots here after deployment.

### Home Page

```
Insert Screenshot
```

### Login Page

```
Insert Screenshot
```

### AI Chat Interface

```
Insert Screenshot
```

---

## 📖 Example Query

```
What is Section 420 IPC?
```

### Response

- Simple Explanation
- Relevant Indian Law
- Applicable Sections
- Punishment
- Suggested Next Steps

---

## 🔒 Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes

---

## 🌍 Supported Languages

- English
- Hindi (हिन्दी)

---

## 🚀 Future Enhancements

- Voice-based legal assistant
- PDF legal document analysis
- Case law search
- Advocate recommendation
- Multi-language support
- AI-powered legal document generation
- Court location finder
- Real-time legal news

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create your feature branch

```bash
git checkout -b feature-name
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push to the branch

```bash
git push origin feature-name
```

5. Open a Pull Request

---

## 👨‍💻 Author

**Neeraj Ahirwar**

- GitHub: https://github.com/neerajahirwar225
- LinkedIn: *(Add your LinkedIn profile here)*

---

## ⭐ Show Your Support

If you found this project helpful, please consider giving it a ⭐ on GitHub.

---

## 📄 License

This project is licensed under the MIT License.
