#!/bin/bash
# Afro Sports - Combined Startup Script
# Starts both frontend and backend together

echo "Starting Afro Sports..."
echo ""

# Start backend in background
echo "Starting Backend (Flask)..."
cd backend
source venv/bin/activate 2>/dev/null || python3 -m venv venv && source venv/bin/activate
pip install -r requirements.txt --quiet
python seed.py 2>/dev/null
flask run --port 5000 &
BACKEND_PID=$!
cd ..

# Wait for backend to start
sleep 2

# Start frontend
echo "Starting Frontend (React)..."
cd frontend
npm install --silent
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "=================================="
echo "Afro Sports is running!"
echo "  Frontend: http://localhost:5173"
echo "  Backend:  http://localhost:5000"
echo "=================================="
echo ""
echo "Press Ctrl+C to stop both servers"

# Handle Ctrl+C
trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT TERM

wait
