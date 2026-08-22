# Afro Sports - Sports Media Platform

A full-stack sports media platform built with React, Flask, and PostgreSQL.

## Tech Stack

**Frontend:**
- React 19 + Vite
- Tailwind CSS 3
- React Router 7
- Lucide React (icons)

**Backend:**
- Flask 3
- Flask-SQLAlchemy + Flask-Migrate
- Flask-JWT-Extended (authentication)
- Flask-CORS
- PostgreSQL
- Redis (caching)
- Sportmonks API (live sports data)

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.11+
- PostgreSQL
- Redis (optional)

### Frontend Setup

```bash
npm install
npm run dev
```

The frontend runs at `http://localhost:5173`.

### Backend Setup

```bash
cd server
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials and Sportmonks API key

# Initialize database
flask db init
flask db migrate -m "Initial migration"
flask db upgrade

# Seed sample data
python seed.py

# Run the server
flask run
```

The API runs at `http://localhost:5000`.

## API Endpoints

### Matches
- `GET /api/live` - Live scores
- `GET /api/matches` - All matches (supports `?date=`, `?sport=`, `?league=`)
- `GET /api/matches/today` - Today's matches
- `GET /api/matches/upcoming` - Upcoming matches
- `GET /api/matches/recent` - Recent results
- `GET /api/matches/:id` - Match details
- `GET /api/matches/team/:team_id` - Team's matches

### Teams
- `GET /api/teams` - All teams (supports `?page=`, `?sport=`)
- `GET /api/teams/:id` - Team details
- `GET /api/teams/:id/players` - Team players
- `GET /api/teams/league/:league_id` - Teams by league

### Leagues
- `GET /api/leagues` - All leagues
- `GET /api/leagues/:id` - League details
- `GET /api/standings/:season_id` - League standings

### News
- `GET /api/news` - Published articles (supports `?page=`, `?category=`)
- `GET /api/news/featured` - Featured articles
- `GET /api/news/breaking` - Breaking news
- `GET /api/news/:slug` - Article by slug
- `GET /api/news/category/:category` - Articles by category
- `POST /api/news` - Create article (auth required)
- `PATCH /api/news/:id` - Update article (auth required)
- `DELETE /api/news/:id` - Delete article (auth required)

### Auth
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Current user profile
- `PATCH /api/auth/me` - Update profile

## Project Structure

```
afro-sports/
├── src/                    # React frontend
│   ├── components/         # Reusable UI components
│   ├── pages/              # Page components
│   ├── services/           # API service layer
│   ├── hooks/              # Custom React hooks
│   ├── context/            # React context (theme)
│   ├── layouts/            # Layout components
│   ├── App.jsx             # Main app with routing
│   └── main.jsx            # Entry point
├── server/                 # Flask backend
│   ├── models/             # SQLAlchemy models
│   ├── routes/             # API route blueprints
│   ├── services/           # External API services
│   ├── app.py              # Flask app factory
│   ├── config.py           # Configuration
│   ├── seed.py             # Database seeder
│   └── requirements.txt    # Python dependencies
└── package.json
```

## License

MIT
