DROP VIEW card_view_new;

CREATE VIEW card_view AS
 SELECT
  card.name,
  card.id,
  card.rarity,
  card.image_placeholder,
  card.card_type,
  COALESCE(pc.hp, tc.hp) AS combined_hp,
  CASE
    WHEN pc.id IS NOT NULL THEN jsonb_build_object(
      'type', pc.type,
      'retreat_cost', pc.retreat_cost,
      'weakness', pc.weakness,
      'hp', pc.hp,
      'stage', pc.stage,
      'is_ex', pc.is_ex
    )
    ELSE NULL::jsonb
  END AS pokemon_card,
  CASE
    WHEN tc.id IS NOT NULL THEN jsonb_build_object(
      'trainer_card_type', tc.trainer_card_type,
      'hp', tc.hp
    )
    ELSE NULL::jsonb
  END AS trainer_card,
  jsonb_build_object(
    'name', set.name,
    'symbol', card.set_symbol
  ) AS set,
  array_agg(DISTINCT pack.symbol) AS packs
FROM card
LEFT JOIN pokemon_card pc ON card.id = pc.id
LEFT JOIN trainer_card tc ON card.id = tc.id
LEFT JOIN set ON card.set_symbol = set.symbol
LEFT JOIN attack ON card.id = attack.pokemon_card_id
LEFT JOIN card_booster_pack_link ON card.id = card_booster_pack_link.card_id
LEFT JOIN booster_pack pack ON pack.id = card_booster_pack_link.booster_pack_id
GROUP BY
  card.name,
  card.id,
  card.set_symbol,
  card.rarity,
  pc.type,
  pc.id,
  pc.hp,
  pc.retreat_cost,
  pc.weakness,
  pc.is_ex,
  pc.stage,
  tc.id,
  set.name;

ALTER TABLE card DROP COLUMN image_path;
