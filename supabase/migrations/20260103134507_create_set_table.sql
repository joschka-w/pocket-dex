CREATE TABLE set (
    symbol text PRIMARY KEY,
    name text UNIQUE NOT NULL,
    release_date date NOT NULL
);