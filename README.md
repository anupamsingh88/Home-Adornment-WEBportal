# 🏡 Home Adornment Web Portal

Welcome to the official repository of the **Home Adornment Web Portal** — a modern, full-stack e-commerce web app designed to showcase and sell premium home decor products. Built with the **MERN stack**, enhanced by **TypeScript**, and styled with **Tailwind CSS**, this portal delivers a seamless user experience across all devices.

> ⚡️ Developed using **Replit's AI Agent** with a no-code interface.  
> 🛠️ Manual setup and configuration of **database**, **backend**, and **ORM** integration were done by me.  
> 🗃️ Database hosted on **Neon Serverless**, queried via **Drizzle ORM** with full TypeScript support.

---

## 🌐 Live Preview

🔗 [Visit Live Website](https://decornest.onrender.com/ _(Add your live deployment link here)_

---

## 🚀 Features

- ✨ **React + TypeScript Frontend** with component-based architecture
- 🎨 **Tailwind CSS** for clean, modern UI styling
- 🧠 **AI-Assisted Development:** Built using Replit AI Agent (no manual UI code)
- 📦 **Dynamic Product Listings** pulled from a live PostgreSQL database
- 🛒 Cart functionality: add, remove, update quantity
- 🌙 **Dark Mode** compatibility with themed logo and text color updates
- 🔐 Auth-ready structure with login/register pages
- ⚙️ Future enhancements: Payment gateway and user settings page
- 📱 Fully **responsive design** optimized for mobile, tablet, and desktop

---

## 🛠 Tech Stack

| Layer         | Technology                          |
|---------------|--------------------------------------|
| 🖥 Frontend    | React.js, TypeScript, Tailwind CSS   |
| 🔧 Backend     | Node.js, Express.js                 |
| 🛢 Database    | Neon (Serverless PostgreSQL)        |
| 🧱 ORM         | Drizzle ORM                         |
| 🧠 AI Support  | Replit AI Agent (No-code builder)   |

---

## 📦 Installation

### 1. Clone the repository
```bash
git clone https://github.com/anupamsingh88/Home-Adornment-WEBportal.git
cd Home-Adornment-WEBportal
````

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root and add:

```env
DATABASE_URL=your_neon_serverless_database_url
```

### 4. Install Drizzle ORM packages (required)

```bash
npm install drizzle-orm @neondatabase/serverless
```

### 5. Install TypeScript support for Drizzle

```bash
npm install -D @types/ws
```

### 6. (Optional) Install Drizzle CLI for migrations

```bash
npm install -D drizzle-kit
```

---

## 🗃 Directory Structure

```
Home-Adornment-WEBportal/
├── client/                 # Frontend (React + TypeScript)
│   ├── src/
│   │   ├── components/     # UI Components
│   │   ├── pages/          # Pages (Home, Product, Cart, etc.)
│   │   ├── styles/         # Tailwind and global styles
│   │   └── main.tsx        # App entry
├── server/                 # Backend (Node.js + Express.js)
│   ├── db/                 # Drizzle schema and config
│   ├── routes/             # Express route handlers
│   └── index.ts            # Main server entry
├── drizzle.config.ts       # Drizzle ORM config
├── .env                    # Environment variables
└── package.json
```

---

## 🔧 Scripts

```bash
# Run frontend and backend
npm run dev

# Generate SQL migrations (optional)
npx drizzle-kit generate

# Push schema to Neon database
npx drizzle-kit push
```

---

## 📌 Author

* 👤 **Anupam Singh**
