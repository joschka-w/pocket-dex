ALTER TABLE trainer_card ENABLE ROW LEVEL SECURITY;

CREATE POLICY "everybody can read all trainer cards"
ON trainer_card
FOR SELECT
USING (true);