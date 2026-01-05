CREATE TABLE deck_likes (
  deck_id uuid NOT NULL REFERENCES deck(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  PRIMARY KEY (deck_id, user_id)
)