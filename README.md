# Automagic Foodtracker — Frontend

React frontend for the Automagic Foodtracker application.

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Axios
- Radix UI Components

## Prerequisites

- Node.js 18+
- npm or yarn

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/alfredbrannare/automagic-foodtracker-frontend.git
cd automagic-foodtracker-frontend
```

### 2. Install dependencies

```bash
npm install
```

#### Environment Variables Reference

| Variable | Description | Example                     |
|----------|-------------|-----------------------------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:8080/api` |

### 4. Run the application

**Development mode:**

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

**Build for production:**

```bash
npm run build
```

## Project Structure

```
src/
├── api/              # API service functions
│   ├── apiClient.ts  # Axios instance with interceptors
│   ├── auth.ts       # Authentication API
│   ├── meal.ts       # Meals API
│   ├── nutrition.ts  # Nutrition API
│   ├── storage.ts    # Storage API
│   └── user.ts       # User API
├── components/
│   ├── feature/      # Feature components
│   │   ├── auth/     # Login, Register forms
│   │   ├── meal/     # Meal section, dialogs
│   │   ├── nutrition/# Nutrition section
│   │   ├── storage/  # Storage section, dialogs
│   │   └── user/     # User settings dialogs
│   ├── layout/       # Layout components (NavigationBar)
│   └── ui/           # Reusable UI components
├── context/          # React contexts
│   ├── AuthContext.tsx
│   ├── MealContext.tsx
│   ├── NutritionContext.tsx
│   ├── StorageContext.tsx
│   └── UserContext.tsx
├── hooks/            # Custom hooks
├── lib/              # Utilities
├── pages/            # Page components
│   ├── Auth.tsx
│   └── Dashboard.tsx
├── types/            # TypeScript types
├── utils/            # Helper functions
├── App.tsx
└── main.tsx
```

## Features

- **User Authentication** — Register, login, logout with JWT
- **Storage Management** — Track meal prep with low stock warnings
- **Meal Logging** — Log meals from storage or custom entries
- **Nutritional Tracking** — Daily nutrition totals vs personal goals
- **Date Navigation** — View historical data up to 2 weeks back

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |

## Connecting to Backend

In order for the frontend to work, it needs to connect to the backend. <br>
It should by default have the correct URL but incase it isn't working add the `VITE_API_URL` in a `.env` file in the root of the project.

See more about starting the backend [here](https://github.com/alfredbrannare/automagic-foodtracker-backend).

## License

MIT