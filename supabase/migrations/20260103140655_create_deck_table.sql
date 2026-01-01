CREATE TABLE deck (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    description text,
    likes_count integer NOT NULL DEFAULT 0,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    colors color[] NOT NULL,
    author uuid NOT NULL REFERENCES profile(id) ON DELETE CASCADE,
    CONSTRAINT deck_colors_check CHECK (
      (cardinality(colors) >= 1)
      AND (cardinality(colors) <= 3)
      AND (cardinality(colors) = cardinality(array_distinct(colors)))
    )
);