# CLINE_CONTEXT.md

# LeadAI Context

This document outlines the current state of the project, architectural decisions, and active development priorities for LeadAI, an AI-first lead handling platform.

---

## Current Objective

- Build an AI-driven lead management system that supports AI in various aspects of lead handling.

---

## Current Product Status

### Working Features
- Lead Capture
- Lead Qualification
- Lead Scoring
- Lead Summaries
- Opening Message Generation
- Dashboard
- Lead Details
- Activities Timeline
- Conversation Storage
- Inbox Foundation
- Conversation Threads
- AI / Lead / Human Sender Types

### In Progress Features
- Realtime Updates
- Human Reply System
- Unread Message System
- AI/Human Handoff

### Not Started Features
- Knowledge Base
- Document Upload
- Embeddings
- Retrieval
- Suggested Replies
- AI Business Context

---

## Current AI Architecture

1. **n8n** - Orchestrates the workflow.
2. **POST /qualify-lead** - Qualifies leads.
3. **FastAPI** - Handles API requests.
4. **llm.py** - Python service for AI processing.
5. **Ollama API** - Provides AI capabilities.
6. **mistral:7b-instruct-q4_0** - The specific model used for AI tasks.
7. **Qualification Response** - AI's response to lead qualification.
8. **Supabase** - Database for storing data.

---

## Messaging Architecture

- **Messages Page**: Displays latest message preview and activity timestamp.
- **Conversation Page**: Full conversation history with chronological ordering and sender types (Lead, AI, Human).

---

## Current Sprint Priorities

1. **Realtime Conversation Updates**
2. **Unread Message System**
3. **Human Reply System**
4. **AI/Human Handoff**

Do not begin channel integrations before these priorities are completed.

---

## Future Intelligence Layer

- **Client**: Interacts with the knowledge base.
- **Knowledge Base**: Stores client knowledge.
- **Documents**: Holds documents for embedding and retrieval.
- **Embeddings**: Converts text into vector representations.
- **Vector Store**: Stores embeddings for efficient search.
- **LeadAI Agent**: Manages lead interactions.
- **Inbox**: Operational layer for managing conversations.
- **Human**: Human interaction within the system.

---

## Important Decisions

- Lead is the primary entity.
- Conversations belong to leads.
- Activities belong to leads.
- Knowledge belongs to clients.
- Channels are transports.
- AI workflow is the product.
- Build operational workflows before channel expansion.

---

## Rules

Before implementing a feature:
1. Explain the solution.
2. List affected files.
3. Identify risks.

Before creating new tables:
1. Check existing schema.
2. Reuse entities where possible.
3. Avoid duplication.

Always follow existing patterns before introducing new ones.
