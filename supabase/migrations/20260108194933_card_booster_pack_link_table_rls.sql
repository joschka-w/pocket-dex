ALTER TABLE card_booster_pack_link ENABLE ROW LEVEL SECURITY;

CREATE POLICY "everybody can read which cards are in which booster packs"
ON card_booster_pack_link
FOR SELECT
USING (true);