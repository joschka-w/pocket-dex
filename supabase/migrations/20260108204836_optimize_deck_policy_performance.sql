DROP POLICY "Users can only create decks belonging to them" ON deck;

CREATE POLICY "Users can only create decks belonging to them"
ON deck
FOR INSERT
WITH CHECK (author = (SELECT auth.uid()));
