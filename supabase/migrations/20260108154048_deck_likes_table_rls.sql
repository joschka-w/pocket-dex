ALTER TABLE deck_likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "everybody can read all likes"
ON deck_likes
FOR SELECT
USING (true);

CREATE POLICY "users can only insert their own likes"
ON deck_likes
FOR INSERT
To authenticated
WITH CHECK (user_id = auth.uid());

CREATE POLICY "users can only delete their own likes"
ON deck_likes
FOR DELETE
To authenticated
USING (user_id = auth.uid());
