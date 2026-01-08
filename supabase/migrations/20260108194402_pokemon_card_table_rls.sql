ALTER TABLE pokemon_card ENABLE ROW LEVEL SECURITY;

CREATE POLICY "everybody can read all pokemon cards"
ON pokemon_card
FOR SELECT
USING (true);