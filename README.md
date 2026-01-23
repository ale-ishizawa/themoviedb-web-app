# 🎬 RT Movies

A modern, responsive web application for exploring popular movies using The Movie Database (TMDB) API. Built with React 19, TypeScript, and a mobile-first approach.

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?logo=vite)
![Tests](https://img.shields.io/badge/Tests-67%20passing-brightgreen)

## ✨ Features

- 🎥 **Browse Popular Movies** - View a grid of currently popular movies
- 🔍 **Movie Details** - See detailed information including overview, rating, runtime, and genres
- ❤️ **Favorites** - Add/remove movies to your favorites list (persisted in localStorage)
- 🎬 **Trailers** - Watch movie trailers directly on YouTube
- 📱 **Fully Responsive** - Mobile-first design that works on all screen sizes
- ⚡ **Fast & Optimized** - Smart caching with TanStack Query
- ♿ **Accessible** - Built with accessibility in mind

## 🚀 Tech Stack

### Core

- **[React 19](https://react.dev/)** - UI library with the latest features
- **[TypeScript](https://www.typescriptlang.org/)** - Static type checking
- **[Vite 7](https://vite.dev/)** - Next-generation build tool

### State & Data Management

- **[TanStack Query v5](https://tanstack.com/query)** - Server state management with caching
- **[Zustand v5](https://zustand-demo.pmnd.rs/)** - Lightweight global state management
- **[Axios](https://axios-http.com/)** - HTTP client with interceptors

### Routing

- **[React Router v7](https://reactrouter.com/)** - Client-side routing

### Styling

- **Pure CSS** - No CSS frameworks, using CSS custom properties
- **BEM Methodology** - Block Element Modifier naming convention
- **Mobile-First** - Progressive enhancement for larger screens

### Testing

- **[Vitest](https://vitest.dev/)** - Fast unit test framework
- **[Testing Library](https://testing-library.com/)** - DOM testing utilities
- **[MSW](https://mswjs.io/)** - API mocking for tests

## 📁 Project Structure

```
src/
├── assets/              # Static assets (icons, images)
│   └── icons/           # SVG icons
├── components/          # Reusable UI components
│   ├── common/          # Generic components
│   │   ├── Header/      # App header with navigation
│   │   ├── Loading/     # Loading spinner
│   │   └── ErrorMessage/# Error display component
│   └── movies/          # Movie-specific components
│       ├── MovieCard/   # Movie card for grid display
│       ├── MovieGrid/   # Responsive movie grid
│       ├── FavoriteButton/ # Add to favorites button
│       └── TrailerList/ # List of movie trailers
├── hooks/               # Custom React hooks
│   ├── useFavorites.ts  # Favorites management hook
│   ├── useMovieDetails.ts # Fetch movie details
│   ├── useMovieTrailers.ts # Fetch movie trailers
│   └── usePopularMovies.ts # Fetch popular movies
├── pages/               # Page components
│   ├── Home/            # Home page with movie grid
│   └── MovieDetail/     # Movie details page
├── providers/           # React context providers
│   └── QueryProvider.tsx # TanStack Query setup
├── router/              # Route configuration
├── services/            # API layer
│   ├── api/             # Axios client configuration
│   └── movies/          # Movie-related API calls
├── stores/              # Zustand stores
│   └── favoritesStore.ts # Favorites state management
├── styles/              # Global styles
│   ├── variables.css    # CSS custom properties
│   └── global.css       # Global styles and utilities
├── test/                # Test configuration
│   └── setup.ts         # Vitest setup
├── types/               # TypeScript type definitions
│   └── movie.ts         # Movie-related types
└── utils/               # Utility functions
    ├── constants.ts     # App constants
    ├── formatters.ts    # Data formatting utilities
    └── image.ts         # Image URL helpers
```

## 🛠️ Prerequisites

- **Node.js** 18.0 or higher
- **npm** 9.0 or higher
- **TMDB API Key** - Get one at [themoviedb.org](https://www.themoviedb.org/settings/api)

## ⚙️ Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/ale-ishizawa/themoviedb-web-app.git
   cd themoviedb-web-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   ```bash
   cp .env.example .env
   ```

4. **Add your TMDB credentials** to the `.env` file:
   ```env
   VITE_TMDB_API_TOKEN=your_bearer_token_here
   VITE_TMDB_API_KEY=your_api_key_here
   VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
   VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
   ```

## 🏃 Running the Project

### Development Server

```bash
npm run dev
```

Opens at [http://localhost:5173](http://localhost:5173)

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🧪 Testing

### Run Tests in Watch Mode

```bash
npm run test
```

### Run Tests Once

```bash
npx vitest run
```

### Run Tests with Coverage

```bash
npm run test:coverage
```

### Test Coverage

The project maintains high test coverage across:

- ✅ **Services** - API call functions
- ✅ **Hooks** - Custom React hooks
- ✅ **Stores** - Zustand state management
- ✅ **Components** - UI components
- ✅ **Utils** - Utility functions

**Current Status: 67 tests passing**

## 📱 Responsive Breakpoints

The app uses a mobile-first approach with the following breakpoints:

| Breakpoint | Min Width | Description                          |
| ---------- | --------- | ------------------------------------ |
| Mobile     | 0px       | Base styles, 2-column grid           |
| Small      | 480px     | Larger touch targets, better spacing |
| Medium     | 640px     | Expanded grid, larger fonts          |
| Tablet     | 768px     | Side-by-side layouts                 |
| Desktop    | 1024px    | Maximum content width                |

## 🎨 Design System

### Colors

| Variable                  | Value   | Usage                  |
| ------------------------- | ------- | ---------------------- |
| `--color-primary`         | #212121 | Header background      |
| `--color-background`      | #ffffff | Page background        |
| `--color-background-dark` | #746A64 | Movie title bar, cards |
| `--color-accent`          | #746A64 | Buttons                |
| `--color-favorite`        | #e94560 | Favorited state        |

### Typography

- **Font Family**: Roboto, system fonts fallback
- **Font Sizes**: 12px to 36px scale
- **Font Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

## 🔧 Available Scripts

| Script                  | Description                    |
| ----------------------- | ------------------------------ |
| `npm run dev`           | Start development server       |
| `npm run build`         | Build for production           |
| `npm run preview`       | Preview production build       |
| `npm run test`          | Run tests in watch mode        |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run lint`          | Run ESLint                     |

## 📚 API Endpoints Used

| Endpoint                 | Description          |
| ------------------------ | -------------------- |
| `GET /movie/popular`     | Fetch popular movies |
| `GET /movie/{id}`        | Get movie details    |
| `GET /movie/{id}/videos` | Get movie trailers   |

## 🏗️ Architecture Decisions

### Why TanStack Query?

- Automatic caching and background refetching
- Built-in loading and error states
- Reduces boilerplate for data fetching
- 5-minute stale time for optimal UX

### Why Zustand?

- Minimal API, easy to learn
- No providers needed (except for hydration)
- Built-in persistence middleware for localStorage
- TypeScript support out of the box

### Why Pure CSS?

- Full control over styles
- No bundle size overhead from CSS frameworks
- CSS custom properties for theming
- Better understanding of styling fundamentals

### Why BEM?

- Clear relationship between HTML and CSS
- Avoids specificity issues
- Self-documenting class names
- Easy to maintain and scale
