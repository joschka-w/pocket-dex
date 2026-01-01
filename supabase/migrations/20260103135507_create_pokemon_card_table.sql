CREATE TABLE pokemon_card (
    id text PRIMARY KEY REFERENCES card(id) ON DELETE CASCADE,
    hp integer NOT NULL,
    type color NOT NULL,
    retreat_cost integer NOT NULL,
    weakness color,
    is_ex boolean NOT NULL,
    stage stage NOT NULL,
    ability_name text,
    ability_effect text
);