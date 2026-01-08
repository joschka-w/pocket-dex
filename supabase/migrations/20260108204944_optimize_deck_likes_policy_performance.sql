DROP POLICY "users can only insert their own likes" ON deck_likes;

CREATE POLICY "users can only insert their own likes"
ON deck_likes
FOR INSERT
To authenticated
WITH CHECK (user_id = (SELECT auth.uid()));

DROP POLICY "users can only delete their own likes" ON deck_likes;

CREATE POLICY "users can only delete their own likes"
ON deck_likes
FOR DELETE
To authenticated
USING (user_id = (SELECT auth.uid()));
