# E-commerce Front-end Challenge

This project is the implementation of the front-end for the e-commerce technical challenge, using Next.js, TypeScript, and shadcn/ui.

## 🚀 Technologies Used

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui** (UI Components)
- **Zustand** (Global state management)
- **Axios** (HTTP Client)
- **Lucide React** (Icons)

## 🛠️ Prerequisites

- Node.js 18+
- pnpm (recommended) or npm/yarn
- Backend running on port 3000 (or configure the URL in `.env`)

## 📦 Installation

1. Clone the repository
2. Install dependencies:

```bash
pnpm install
```

3. Configure environment variables (optional if backend is on localhost:3000):

Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## 🏃‍♂️ Running the Project

```bash
pnpm dev
```

The project will be available at `http://localhost:3001` (or another port if 3000 is occupied by the backend).

## 📂 Project Structure

- `/app`: Next.js pages and layouts
- `/components`: Reusable React components
  - `/ui`: shadcn/ui components
- `/services`: API services (Axios)
- `/store`: State management (Zustand)
- `/types`: TypeScript type definitions
- `/lib`: Utilities

## ✨ Features

- **Product Listing**: Display of products in a grid.
- **Product Details**: Dedicated page with detailed information.
- **Shopping Cart**: Interactive sidebar to manage cart items.
- **Add/Remove**: Full cart functionality.
- **Responsiveness**: Adaptive layout for mobile and desktop.
