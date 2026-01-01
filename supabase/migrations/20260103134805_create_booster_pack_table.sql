CREATE TABLE booster_pack (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    set_symbol text NOT NULL REFERENCES set(symbol),
    name text UNIQUE NOT NULL,
    release_date date NOT NULL,
    symbol text NOT NULL
);