CREATE TABLE card_booster_pack_link (
    card_id text NOT NULL REFERENCES card(id) ON DELETE CASCADE,
    booster_pack_id bigint NOT NULL REFERENCES booster_pack(id),
    PRIMARY KEY (card_id, booster_pack_id)
);