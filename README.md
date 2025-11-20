# No Dice Games - Frontend

No Dice Games is a board game review aggregation app allowing users to view, vote and comment on reviews amongst other features.

**[View the live application here](https://nodicegames.netlify.app/)**

This project was developed as part of the **Northcoders Full-Stack Software Developer Bootcamp**.

## Features

- Homepage carousel of featured reviews
- View all articles with filtering and sorting capabilities
- View detailed article pages with voting functionality
- Filter, sort and order articles via query parameters
- User authentication to post and manage comments
- Upvote or downvote articles
- Delete comments authored by the current user

## Tech Stack

- **React** - UI library for building user interfaces
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **Vitest** - Unit testing framework

## Backend Repository

The corresponding backend API can be found here: [No Dice Games Backend](https://github.com/Oliver1334/nodicegames-BE.git)

## Installation & Setup

### Prerequisites

- Node.js (minimum version 19.1.0)

### Steps

1. Clone this repository:
```bash
git clone https://github.com/Oliver1334/nodicegames-FE.git
```

2. Navigate to the project directory:
```bash
cd nodicegames-FE
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm run dev
```

5. The application will automatically open in your default browser. If not, navigate to http://localhost:3000

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality
