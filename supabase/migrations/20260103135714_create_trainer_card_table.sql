CREATE TABLE trainer_card (
    id text PRIMARY KEY REFERENCES card(id) ON DELETE CASCADE,
    trainer_card_type trainer_card_type NOT NULL,
    hp integer,
    effect text NOT NULL,
    CONSTRAINT check_fossil_hp CHECK (
      (
        (
          (trainer_card_type = 'Item (Fossil)'::trainer_card_type)
          AND (hp IS NOT NULL)
        )
        OR (
          (trainer_card_type <> 'Item (Fossil)'::trainer_card_type)
          AND (hp IS NULL)
        )
      )
    )
);