CREATE TRIGGER create_initial_conversation_after_lead_insert
AFTER INSERT ON leads
FOR EACH ROW
EXECUTE FUNCTION create_initial_conversation();