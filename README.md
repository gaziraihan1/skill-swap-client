# SkillSwap 🌟

SkillSwap is a web application built with **Next.js 15**, **Tailwind CSS**, and a powerful backend using **Node.js**, **Express**, and **MongoDB**. It allows users to **offer**, **explore**, and **exchange skills** with others — fostering a community of learning and collaboration.

> ✅ This is my **first full-stack Next.js project**, made while learning Next.js, and some improvements are still in progress.

---

## 🔗 Live Website

[👉 Visit SkillSwap Live](https://skill-swap-application.vercel.ap)

---

## 🛠️ Tech Stack

### ⚛️ Frontend

- **Next.js 15 (App Router)**
- **React 19**
- **Tailwind CSS & DaisyUI**
- **Framer Motion**
- **React Hook Form**
- **React Icons**
- **Radix UI**
- **Lucide React**
- **Keen Slider**
- **React Loading Skeleton**

### 🔐 Authentication & Security

- **Firebase Authentication**
- **JWT Token-based Authorization** (generated and stored with Firebase & backend)
- **Protected Routes via Middleware**

### 📦 Backend (Separate Repo)

- **Express.js + MongoDB**
- **JWT Token Handling**
- **REST APIs for Offers, Swaps, Feedback, and Users**

---

## 🚀 Features

- ✅ Sign Up / Sign In with Firebase
- ✅ Role-based user system (`admin`, `user`)
- ✅ Explore available skill offers from other users
- ✅ Create and manage your own skill offers
- ✅ Send swap requests and manage swap status (pending, accepted, completed)
- ✅ Leave feedback & ratings after skill exchange
- ✅ Admin dashboard for user and swap management
- ✅ Suspense + Skeleton loading UI for a smooth experience
- ✅ Fully responsive layout

---
---

## 🔐 Authentication Flow

- Users authenticate via **Firebase Auth**
- After login, a **JWT token is generated** from the backend using Firebase ID token and saved in `localStorage`
- **Protected routes** are handled via `middleware.ts` using token validation

---

## 🧪 Improvements Coming Soon

- Add pagination on explore page
- Better error handling
- Notification system for accepted/declined swaps
- Unit testing with Jest/React Testing Library

---

## 📦 Installation & Local Setup

```bash
# Clone the repository
git clone https://github.com/gaziraihan1/skill-swap-client.git
cd skillswap-client

# Install dependencies
npm install

# Add environment variables
touch .env.local
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

If you'd like to contribute to SkillSwap, please fork the repository and submit a pull request. You can also open an issue to report bugs or suggest new features.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/YourFeature`)
3. Commit your Changes (`git commit -m 'Add some feature'`)
4. Push to the Branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

---

## 📃 License

This project is licensed under the **MIT License**.  
You are free to use, modify, and distribute this project for personal and commercial use.

See the [LICENSE](./LICENSE) file for more details.

---

## 👨‍💻 Author

### Mohammad Raihan Gazi  
- 💼 Frontend & Full Stack Developer  
- 🌍 Based in **Dhaka, Bangladesh**  
- 📧 Email: [gazyraihan3@gmail.com](mailto:gazyraihan3@gmail.com)  
- 🔗 LinkedIn: [linkedin.com/in/mohammad-raihan-gazi](https://linkedin.com/in/mohammad-raihan-gazi) 
