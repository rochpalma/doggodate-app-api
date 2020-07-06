CREATE TABLE comments (
    comment_id INTEGER REFERENCES dog_profile(id) ON DELETE CASCADE NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    content TEXT NOT NULL,
    created_at DATE NOT NULL
);