ALTER TABLE booster_pack ENABLE ROW LEVEL SECURITY;

CREATE POLICY "everybody can read all booster packs"
ON booster_pack
FOR SELECT
USING (true);