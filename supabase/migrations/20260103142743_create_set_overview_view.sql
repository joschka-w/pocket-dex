CREATE VIEW set_overview AS
SELECT
  set.name,
  set.symbol,
  jsonb_agg(jsonb_build_object(
    'name', booster_pack.name,
    'value', booster_pack.symbol)
  ) AS packs
FROM set
LEFT JOIN booster_pack ON set.symbol = booster_pack.set_symbol
GROUP BY
  set.name,
  set.symbol
ORDER BY set.release_date;