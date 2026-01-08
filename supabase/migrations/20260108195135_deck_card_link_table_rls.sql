ALTER TABLE deck_card_link ENABLE ROW LEVEL SECURITY;

CREATE POLICY "everybody can read which cards are in which booster packs"
ON deck_card_link
FOR SELECT
USING (true);

CREATE POLICY "users can only add cards to their own decks"
ON deck_card_link
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM deck
    WHERE deck.id = deck_card_link.deck_id
    AND deck.author = auth.uid()
  )
);