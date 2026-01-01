CREATE TABLE deck_card_link (
    deck_id uuid NOT NULL REFERENCES deck(id) ON DELETE CASCADE,
    card_id text NOT NULL REFERENCES card(id),
    quantity integer NOT NULL,
    PRIMARY KEY (deck_id, card_id)
);