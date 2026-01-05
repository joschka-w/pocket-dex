DROP FUNCTION like_deck;

CREATE OR REPLACE FUNCTION like_deck(p_deck_id uuid) 
RETURNS integer
LANGUAGE plpgsql
AS $$
DECLARE
    v_is_liked boolean;
    v_user_id UUID := auth.uid();
    v_new_likes_count integer;
BEGIN
    -- Check if user has already liked the deck
    SELECT EXISTS (
        SELECT 1 
        FROM deck_likes 
        WHERE deck_id = p_deck_id AND user_id = v_user_id
    ) INTO v_is_liked;
    
    IF v_is_liked THEN
        -- If already liked, remove the like
        DELETE FROM deck_likes
        WHERE deck_id = p_deck_id AND user_id = v_user_id;
        
        -- And update the like count
        UPDATE deck 
        SET likes_count = likes_count - 1 
        WHERE id = p_deck_id
        RETURNING likes_count into v_new_likes_count;
    ELSE
        -- If not liked, add the like
        INSERT INTO deck_likes (deck_id, user_id)
        VALUES (p_deck_id, v_user_id);
        
        -- And update the like count
        UPDATE deck 
        SET likes_count = likes_count + 1 
        WHERE id = p_deck_id
        RETURNING likes_count INTO v_new_likes_count;
    END IF;

    RETURN v_new_likes_count;
END;
$$;