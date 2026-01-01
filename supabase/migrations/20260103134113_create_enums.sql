CREATE TYPE card_type AS ENUM (
    'pokemon',
    'trainer'
);

CREATE TYPE trainer_card_type AS ENUM (
    'Supporter',
    'Item',
    'Item (Fossil)',
    'Pokemon Tool'
);

CREATE TYPE color AS ENUM (
    'grass',
    'fire',
    'water',
    'lightning',
    'psychic',
    'fighting',
    'darkness',
    'metal',
    'dragon',
    'colorless'
);

CREATE TYPE rarity AS ENUM (
    'diamond_1',
    'diamond_2',
    'diamond_3',
    'diamond_4',
    'star_1',
    'star_2',
    'star_3',
    'crown',
    'promo'
);

CREATE TYPE stage AS ENUM (
    'Basic',
    'Stage 1',
    'Stage 2'
);