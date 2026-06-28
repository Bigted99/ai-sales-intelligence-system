CREATE OR REPLACE FUNCTION create_initial_conversation()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    -- Do not create a conversation if there is no message.
    IF NEW.message IS NULL OR trim(NEW.message) = '' THEN
        RETURN NEW;
    END IF;

    INSERT INTO conversations (
        lead_id,
        client_id,
        channel,
        direction,
        sender_type,
        sender_identifier,
        message,
        message_type,
        ai_generated,
        conversation_status
    )
    VALUES (
        NEW.id,
        NEW.client_id,
        COALESCE(NEW.lead_source_channel, 'web_form'),
        'inbound',
        'lead',
        NEW.email,
        NEW.message,
        'text',
        false,
        'active'
    );

    RETURN NEW;
END;
$$;

