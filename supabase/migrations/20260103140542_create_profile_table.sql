CREATE TABLE profile (
    id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username text UNIQUE,
    avatar_url text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);