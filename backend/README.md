# RescueLink Flask Backend

## Setup

```bash
cd backend
pip install flask flask-cors
python app.py
```

Server runs at **http://localhost:5000**

## API Endpoints

| Method | Endpoint              | Description              |
|--------|-----------------------|--------------------------|
| POST   | `/report-accident`    | Submit an accident report |
| GET    | `/accidents`          | List all accidents        |
| POST   | `/register-volunteer` | Register a volunteer      |
| GET    | `/volunteers`         | List all volunteers       |

## Database

SQLite database (`rescuelink.db`) is auto-created on first run.

## Frontend Configuration

Set `VITE_API_URL=http://localhost:5000` in a `.env` file at the project root, then start the frontend. It will call these endpoints instead of using mock data.
