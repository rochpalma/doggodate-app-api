
INSERT INTO users (full_name, email, "password") VALUES
    (
        'Roch',
        'rop@gmail.com',
        'password'
    );


CREATE TABLE dog_profile(
    id SERIAL PRIMARY KEY,
    full_name TEXT NOT NULL,
    age INTEGER NOT NULL,
    about_me TEXT,
    breed breeds NOT NULL,
    size sizes NOT NULL,
    gender TEXT NOT NULL,
    owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL
)

INSERT INTO dog_profile (full_name, age, about_me, breed, size, gender, owner_id) VALUES
    (
        'Botchog',
        '6',
        'Hi! Im Botchog, 6yo',
        'Poodle (Miniature)',
        'Medium',
        'male',
        '1'       
    );