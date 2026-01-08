ALTER TABLE card ENABLE ROW LEVEL SECURITY;

CREATE POLICY "everybody can read all cards"
ON card
FOR SELECT
USING (true);