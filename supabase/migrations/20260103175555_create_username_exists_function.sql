CREATE OR REPLACE FUNCTION username_exists(input_username TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 
        FROM profile 
        WHERE username = input_username
    );
END;
$$;