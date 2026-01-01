CREATE OR REPLACE FUNCTION create_deck(
    p_title text,
    p_colors color[],
    p_cards jsonb,
    p_description text
) 
RETURNS void
LANGUAGE plpgsql
AS $$
DECLARE
    v_deck_id UUID;
    v_card_id TEXT;
    v_quantity INTEGER;
    v_total_cards INTEGER := 0;
    v_card_record RECORD;
    v_user_id UUID;
BEGIN
    -- Get user id
    v_user_id := auth.uid();
    
    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'Please login to create a deck';
    END IF;
    
    -- Validate input
    FOR v_card_record IN SELECT * FROM jsonb_each_text(p_cards) LOOP
        v_card_id := v_card_record.key;
        v_quantity := v_card_record.value::INTEGER;
        
        -- Validate quantity per card (max 2)
        IF v_quantity < 1 OR v_quantity > 2 THEN
            RAISE EXCEPTION 'Card % must have quantity between 1 and 2 (got %)',
                v_card_id, v_quantity;
        END IF;
        
        v_total_cards := v_total_cards + v_quantity;
    END LOOP;
    
    -- Validate deck size (20)
    IF v_total_cards != 20 THEN
        RAISE EXCEPTION 'Deck has to contain exactly 20 cards (got %)',
            v_total_cards;
    END IF;
    
    -- Create deck
    INSERT INTO deck(title, description, colors, author)
    VALUES (p_title, p_description, p_colors, v_user_id)
    RETURNING id INTO v_deck_id;
    
    -- Insert card links
    FOR v_card_record IN SELECT * FROM jsonb_each_text(p_cards) LOOP
        v_card_id := v_card_record.key;
        v_quantity := v_card_record.value::INTEGER;
        
        INSERT INTO deck_card_link(deck_id, card_id, quantity)
        VALUES (v_deck_id, v_card_id, v_quantity);
    END LOOP;
END;
$$;