# LeadAI Domain Model

## Purpose

This document defines the business domains (engines) that make up LeadAI.

It is NOT a technical implementation guide.

It is NOT a database schema.

It defines ownership.

Every feature, table, API endpoint, automation and workflow must belong to one domain.

This prevents overlapping responsibilities and keeps LeadAI scalable.

---

# LeadAI Core Architecture

                    LeadAI

                       │

      ┌────────────────┼────────────────┐

      ▼                ▼                ▼

 CRM Engine     Conversation Engine   Workflow Engine

      │                │                │

      ▼                ▼                ▼

 AI Engine      Communication Engine   Knowledge Engine

---

# 1. CRM Engine

## Purpose

The CRM Engine owns business relationships.

It answers one question:

> Who is this customer?

## Owns

- Leads
- Customers
- Client relationships
- Lifecycle stages
- Ownership
- Qualification results

## Database Tables

- leads
- clients

## Examples

Lead submits a form.

Lead becomes customer.

Lead assigned to salesperson.

Lead closed.

Lead lifecycle changes.

The CRM Engine never owns messages.

---

# 2. Conversation Engine

## Purpose

The Conversation Engine owns communication history.

It answers one question:

> What was said?

Every communication becomes a conversation event.

The inbox is simply a visualization of the Conversation Engine.

## Owns

- Inbox
- Threads
- Messages
- AI replies
- Human replies
- Conversation ordering
- Read status
- Realtime updates

## Database Tables

- conversations

## Examples

Lead submits form.

AI sends email.

Human replies.

Lead replies.

WhatsApp message received.

Instagram DM received.

SMS received.

Nothing is overwritten.

Every communication becomes a conversation event.

---

# 3. Communication Engine

## Purpose

The Communication Engine owns delivery.

It answers one question:

> How do we communicate?

It never owns conversation history.

It never owns CRM data.

## Owns

- Email providers
- WhatsApp
- Instagram
- SMS
- Facebook Messenger
- API integrations
- Channel health
- Authentication
- Delivery providers

## Database Tables

- communication_channels

## Examples

Resend connected.

Instagram connected.

WhatsApp disconnected.

SMTP credentials expired.

Email authentication failed.

These are infrastructure events.

Not conversations.

---

# 4. Workflow Engine

## Purpose

The Workflow Engine owns operational state.

It answers one question:

> What happened inside LeadAI?

## Owns

- Activities
- Monitoring
- Failures
- Retries
- Background jobs
- Operational health
- Human tasks

## Database Tables

- lead_activities
- tasks
- failed_leads

## Examples

Lead qualified.

AI failed.

Email delivery failed.

Workflow timeout.

Human review required.

Retry scheduled.

Task assigned.

These are operational events.

Not conversations.

---

# 5. AI Engine

## Purpose

The AI Engine owns intelligence.

It answers one question:

> What does LeadAI think?

## Owns

- Lead qualification
- Lead scoring
- Human summaries
- AI replies
- Suggested responses
- Intent detection
- Confidence scoring
- Retrieval generation

## Current Components

- FastAPI
- Ollama
- llm.py

The AI Engine never owns communication.

It only produces intelligence.

---

# 6. Knowledge Engine

## Purpose

The Knowledge Engine owns company knowledge.

It answers one question:

> What does LeadAI know?

## Owns

- Knowledge Base
- Documents
- Embeddings
- Vector Store
- Retrieval

## Database Tables

- knowledge_base_files

Future:

- embeddings
- vector indexes

---

# Event Lifecycle

Every feature should fit into this lifecycle.

Lead Created

↓

CRM Engine

↓

Conversation Started

↓

AI Qualification

↓

Outbound Communication

↓

Delivery Monitoring

↓

Reply Received

↓

Human Takeover

↓

Conversation Closed

---

# Responsibility Matrix

Lead submitted?
→ CRM Engine

Message received?
→ Conversation Engine

Email connected?
→ Communication Engine

Email failed?
→ Workflow Engine

Lead scored?
→ AI Engine

Document uploaded?
→ Knowledge Engine

---

# Design Principles

## Single Responsibility

Every table belongs to one engine.

Every feature belongs to one engine.

No overlapping ownership.

---

## Event Driven

LeadAI reacts to business events.

Not page actions.

Not UI actions.

---

## Source of Truth

CRM owns business records.

Conversation Engine owns messages.

Workflow owns operational history.

Communication owns delivery.

AI owns intelligence.

Knowledge owns information.

---

## Future Vision

LeadAI is not an AI chatbot.

LeadAI is an operational platform composed of independent engines working together.

Each engine can evolve independently while sharing the same business events.