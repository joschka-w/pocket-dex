ALTER TABLE attack ENABLE ROW LEVEL SECURITY;

CREATE POLICY "everybody can read all attacks"
ON attack
FOR SELECT
USING (true);