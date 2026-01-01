CREATE TABLE attack (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text NOT NULL,
    energy_cost color[] NOT NULL,
    damage integer,
    damage_modifier text,
    effect text,
    pokemon_card_id text NOT NULL REFERENCES pokemon_card(id) ON DELETE CASCADE
);
