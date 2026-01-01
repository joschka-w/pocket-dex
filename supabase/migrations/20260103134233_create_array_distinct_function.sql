CREATE OR REPLACE FUNCTION array_distinct(anyarray, boolean DEFAULT false) 
RETURNS anyarray
LANGUAGE sql 
IMMUTABLE
AS $$
  SELECT array_agg(DISTINCT x) 
  FROM unnest($1) t(x) 
  WHERE CASE 
    WHEN $2 THEN x IS NOT NULL 
    ELSE true 
  END;
$$;