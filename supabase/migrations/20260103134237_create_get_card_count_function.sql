CREATE OR REPLACE FUNCTION get_card_count(pack_id bigint) 
RETURNS jsonb
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN (
        SELECT COALESCE(
            jsonb_object_agg(rarity, count),
            '{}'::jsonb
        )
        FROM (
            SELECT 
                rarity,
                COUNT(*) AS count
            FROM card
            JOIN card_booster_pack_link link ON link.card_id = card.id
            JOIN booster_pack pack ON pack.id = link.booster_pack_id
            WHERE pack.id = pack_id
            GROUP BY rarity
        ) counts
    );
END
$$;