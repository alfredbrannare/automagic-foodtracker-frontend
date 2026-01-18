# Automagic Food Tracker — Frontend

React frontend for the Automagic Food Tracker application.

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

### 3. Configure environment variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:8080/api
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

**Preview production build:**

```bash
npm run preview
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
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Connecting to Backend

Make sure the backend is running at the URL specified in `VITE_API_URL`.

For local development:
1. Start PostgreSQL database
2. Start the backend: `./mvnw spring-boot:run -Dspring-boot.run.profiles=dev`
3. Start the frontend: `npm run dev`

## License

MIT