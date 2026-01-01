CREATE OR REPLACE FUNCTION validate_pokemon_card() 
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM card 
        WHERE id = NEW.id AND card_type = 'pokemon'
    ) THEN
        RAISE EXCEPTION 'Card ID % must reference a pokemon card type', NEW.id;
    END IF;
    RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER pokemon_card_validation 
    BEFORE INSERT OR UPDATE ON pokemon_card 
    FOR EACH ROW 
    EXECUTE FUNCTION validate_pokemon_card();