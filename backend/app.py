"""
RescueLink Flask Backend
========================
Run: pip install flask flask-cors && python app.py
Server starts at http://localhost:5000
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
from database import init_db, get_db
from datetime import datetime
import uuid

app = Flask(__name__)
CORS(app)

init_db()


@app.route("/accidents", methods=["GET"])
def get_accidents():
    db = get_db()
    rows = db.execute(
        "SELECT id, description, severity, lat, lng, address, image_url, reported_at FROM accidents ORDER BY reported_at DESC"
    ).fetchall()
    accidents = [
        {
            "id": r["id"],
            "description": r["description"],
            "severity": r["severity"],
            "lat": r["lat"],
            "lng": r["lng"],
            "address": r["address"],
            "imageUrl": r["image_url"],
            "reportedAt": r["reported_at"],
        }
        for r in rows
    ]
    return jsonify(accidents)


@app.route("/report-accident", methods=["POST"])
def report_accident():
    data = request.get_json()
    if not data or not data.get("description"):
        return jsonify({"error": "Description is required"}), 400

    accident_id = str(uuid.uuid4())
    now = datetime.utcnow().isoformat()
    db = get_db()
    db.execute(
        """INSERT INTO accidents (id, description, severity, lat, lng, address, image_url, reported_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)""",
        (
            accident_id,
            data["description"],
            data.get("severity", "medium"),
            data.get("lat"),
            data.get("lng"),
            data.get("address", ""),
            data.get("imageUrl", ""),
            now,
        ),
    )
    db.commit()
    return jsonify({"id": accident_id, "message": "Accident reported successfully"}), 201


@app.route("/volunteers", methods=["GET"])
def get_volunteers():
    db = get_db()
    rows = db.execute(
        "SELECT id, name, email, phone, city, skills, registered_at FROM volunteers ORDER BY registered_at DESC"
    ).fetchall()
    volunteers = [
        {
            "id": r["id"],
            "name": r["name"],
            "email": r["email"],
            "phone": r["phone"],
            "city": r["city"],
            "skills": r["skills"],
            "registeredAt": r["registered_at"],
        }
        for r in rows
    ]
    return jsonify(volunteers)


@app.route("/register-volunteer", methods=["POST"])
def register_volunteer():
    data = request.get_json()
    if not data or not data.get("name") or not data.get("email") or not data.get("phone"):
        return jsonify({"error": "Name, email, and phone are required"}), 400

    volunteer_id = str(uuid.uuid4())
    now = datetime.utcnow().isoformat()
    db = get_db()
    db.execute(
        """INSERT INTO volunteers (id, name, email, phone, city, skills, registered_at)
           VALUES (?, ?, ?, ?, ?, ?, ?)""",
        (
            volunteer_id,
            data["name"],
            data["email"],
            data["phone"],
            data.get("city", ""),
            data.get("skills", ""),
            now,
        ),
    )
    db.commit()
    return jsonify({"id": volunteer_id, "message": "Volunteer registered successfully"}), 201


if __name__ == "__main__":
    app.run(debug=True, port=5000)
