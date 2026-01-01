CREATE OR REPLACE FUNCTION create_trainer_card(
    id text,
    name text,
    set_symbol text,
    set_number integer,
    rarity rarity,
    card_type card_type,
    image_path text,
    image_placeholder text,
    pack_ids integer[],
    trainer_card_type trainer_card_type,
    hp integer,
    effect text
) 
RETURNS void
LANGUAGE plpgsql
AS $$
DECLARE
    pack_id INTEGER;
BEGIN
    INSERT INTO card(name, set_symbol, set_number, rarity, card_type, image_path, image_placeholder)
    VALUES (name, set_symbol, set_number, rarity, card_type, image_path, image_placeholder);
    
    INSERT INTO trainer_card(id, trainer_card_type, hp, effect)
    VALUES (id, trainer_card_type, hp, effect);
    
    FOREACH pack_id IN ARRAY pack_ids LOOP
        INSERT INTO card_booster_pack_link(card_id, booster_pack_id)
        VALUES (id, pack_id);
    END LOOP;
END
$$;