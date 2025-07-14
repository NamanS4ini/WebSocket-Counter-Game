# 🔢 Real-Time Counter App

This is a **real-time multiplayer counter game** built with **Next.js 15**, **Tailwind CSS**, **TypeScript**, and **Socket.IO**.

Every user shares a single global counter. Clicking increases the counter for everyone, and reset events are tracked and shared live!

---

## 🚀 Features

- 🔁 Real-time counter updates using **WebSocket (Socket.IO)**
- 🌐 Multiplayer support
- 🧠 Tracks total resets, player count, and all-time high
- 📦 Built with **Next.js App Router**
- 🎨 Styled with **Tailwind CSS**

---

## 🛠️ Tech Stack

- [Next.js 15](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Socket.IO Client](https://socket.io/)
- [MongoDB](https://www.mongodb.com/)

---

## 🔐 Environment Variables

Create a `.env.local` file in your project root:

```env
MONGODB_URI=mongodb://localhost:27017/counter

NEXT_PUBLIC_SOCKET_URL=http://localhost:3001

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 💻 Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

---

## 🌍 Deployment

- Frontend hosted on **Vercel**: [Vercel](https://vercel.com/)
- Backend (Socket.IO server) hosted on **Railway** or any Node-compatible host

---

## 🤝 Contributing

Contributions are welcome! Fork the repo and open a PR anytime.
