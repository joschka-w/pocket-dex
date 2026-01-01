CREATE OR REPLACE FUNCTION validate_trainer_card() 
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM card 
        WHERE id = NEW.id AND card_type = 'trainer'
    ) THEN
        RAISE EXCEPTION 'Card ID % must reference a trainer card type', NEW.id;
    END IF;
    RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER trainer_card_validation 
    BEFORE INSERT OR UPDATE ON trainer_card 
    FOR EACH ROW 
    EXECUTE FUNCTION validate_trainer_card();