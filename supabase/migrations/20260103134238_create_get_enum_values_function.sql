CREATE OR REPLACE FUNCTION get_enum_values(enum_type_name text) 
RETURNS text[]
LANGUAGE plpgsql
AS $$
DECLARE
    result text[];
BEGIN
    EXECUTE format('
        SELECT array_agg(enum_value::text) 
        FROM unnest(enum_range(NULL::%I)) AS enum_value
    ', enum_type_name) INTO result;
    
    RETURN result;
END;
$$;