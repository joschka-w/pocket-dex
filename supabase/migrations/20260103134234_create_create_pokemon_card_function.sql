CREATE OR REPLACE FUNCTION create_pokemon_card(
    id text,
    name text,
    set_symbol text,
    set_number integer,
    rarity rarity,
    card_type card_type,
    image_path text,
    image_placeholder text,
    hp integer,
    type color,
    retreat_cost integer,
    weakness color,
    is_ex boolean,
    stage stage,
    ability_name text,
    ability_effect text,
    pack_ids integer[],
    attack_1_name text,
    attack_1_energy_cost color[],
    attack_1_damage integer,
    attack_1_damage_modifier text,
    attack_1_effect text,
    attack_2_name text,
    attack_2_energy_cost color[],
    attack_2_damage integer,
    attack_2_damage_modifier text,
    attack_2_effect text
) 
RETURNS void
LANGUAGE plpgsql
AS $$
DECLARE
    pack_id INTEGER;
BEGIN
    INSERT INTO card(name, set_symbol, set_number, rarity, card_type, image_path, image_placeholder)
    VALUES (name, set_symbol, set_number, rarity, card_type, image_path, image_placeholder);
    
    INSERT INTO pokemon_card(id, hp, type, retreat_cost, weakness, is_ex, stage, ability_name, ability_effect)
    VALUES (id, hp, type, retreat_cost, weakness, is_ex, stage, ability_name, ability_effect);
    
    FOREACH pack_id IN ARRAY pack_ids LOOP
        INSERT INTO card_booster_pack_link(card_id, booster_pack_id)
        VALUES (id, pack_id);
    END LOOP;
    
    IF attack_1_name IS NOT NULL THEN
        INSERT INTO attack(name, energy_cost, damage, damage_modifier, effect, pokemon_card_id)
        VALUES (attack_1_name, attack_1_energy_cost, attack_1_damage, attack_1_damage_modifier, attack_1_effect, id);
    END IF;
    
    IF attack_2_name IS NOT NULL THEN
        INSERT INTO attack(name, energy_cost, damage, damage_modifier, effect, pokemon_card_id)
        VALUES (attack_2_name, attack_2_energy_cost, attack_2_damage, attack_2_damage_modifier, attack_2_effect, id);
    END IF;
END
$$;