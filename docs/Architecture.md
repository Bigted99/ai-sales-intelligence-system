# System Architecture

User submits lead (frontend form)
→ API route validates user
→ data sent to n8n webhook
→ AI processes lead
→ result stored in Supabase
→ dashboard fetches user-specific data

Key concept:
Each lead is tied to a client_id for multi-user isolation.