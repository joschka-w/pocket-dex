CREATE TABLE card (
    id text GENERATED ALWAYS AS (((set_symbol || '-'::text) || lpad((set_number)::text, 3, '0'::text))) STORED PRIMARY KEY,
    name text NOT NULL,
    rarity rarity NOT NULL,
    card_type card_type NOT NULL,
    set_symbol text NOT NULL REFERENCES set(symbol) ON DELETE CASCADE,
    set_number integer NOT NULL,
    image_path text NOT NULL,
    image_placeholder text NOT NULL
);