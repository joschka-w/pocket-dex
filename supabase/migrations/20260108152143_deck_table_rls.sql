ALTER TABLE deck ENABLE ROW LEVEL SECURITY;

CREATE POLICY "everybody can read all decks"
ON deck
FOR SELECT
USING (true);

CREATE POLICY "Users can only create decks belonging to them"
ON deck
FOR INSERT
WITH CHECK (author = auth.uid());
