CREATE OR REPLACE FUNCTION handle_new_user() 
RETURNS trigger
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path TO ''
AS $$
BEGIN
    INSERT INTO public.profile(id, username, avatar_url, created_at)
    VALUES (
        NEW.id,
        NULL,
        NEW.raw_user_meta_data ->> 'avatar_url',
        NOW()
    );
    RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER on_auth_user_created 
    AFTER INSERT ON auth.users 
    FOR EACH ROW 
    EXECUTE FUNCTION handle_new_user();