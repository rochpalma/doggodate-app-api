CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    event_name TEXT NOT NULL,
    created_at DATE NOT NULL,
    start_at TIME NOT NULL,
    end_at TIME NOT NULL,
    recipient INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL
);