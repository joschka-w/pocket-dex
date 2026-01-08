DROP POLICY "users can only add cards to their own decks" ON deck_card_link;

CREATE POLICY "users can only add cards to their own decks"
ON deck_card_link
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM deck
    WHERE deck.id = deck_card_link.deck_id
    AND deck.author = (SELECT auth.uid())
  )
);