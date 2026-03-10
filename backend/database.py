"""SQLite database setup for RescueLink."""

import sqlite3
import os

DATABASE = os.path.join(os.path.dirname(__file__), "rescuelink.db")


def get_db():
    db = sqlite3.connect(DATABASE)
    db.row_factory = sqlite3.Row
    return db


def init_db():
    db = get_db()
    db.executescript(
        """
        CREATE TABLE IF NOT EXISTS accidents (
            id TEXT PRIMARY KEY,
            description TEXT NOT NULL,
            severity TEXT NOT NULL DEFAULT 'medium',
            lat REAL,
            lng REAL,
            address TEXT DEFAULT '',
            image_url TEXT DEFAULT '',
            reported_at TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS volunteers (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT NOT NULL,
            city TEXT DEFAULT '',
            skills TEXT DEFAULT '',
            registered_at TEXT NOT NULL
        );
        """
    )
    db.commit()
    db.close()
