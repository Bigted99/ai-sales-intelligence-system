# System Architecture

User submits lead (frontend form)
→ API route validates user
→ data sent to n8n webhook
→ AI processes lead
→ result stored in Supabase
→ dashboard fetches user-specific data

Key concept:
Each lead is tied to a client_id for multi-user isolation.


# ARCHITECTURE.md

# LeadAI Architecture

## Purpose

This document explains:

* How LeadAI is structured.
* How data moves through the platform.
* The order in which systems depend on each other.
* The order in which features should be developed.

This document is the primary architectural reference for developers and AI coding agents.

---

# Architecture Order

Architecture Order describes the final dependency hierarchy of the system.

This is NOT build order.

This is NOT runtime execution order.

Client
↓
Knowledge Base
↓
Documents

* FAQs
* Services
* Pricing
* Policies
* Products
* Case Studies

↓

Embeddings

↓

Vector Store

↓

LeadAI Agent

↓

Inbox

↓

Human

---

## Why Inbox Appears Near The End

The inbox is not the intelligence layer.

The inbox is the operational layer.

The AI must first:

* Understand the business
* Understand the lead
* Retrieve context
* Generate recommendations

before those outputs appear inside the inbox.

---

# Development Order

Development Order defines the recommended implementation sequence.

This order exists to maximize testability and user value.

1. Leads
2. Conversations
3. Inbox Foundation
4. Realtime Updates
5. Human Reply
6. Unread System
7. AI/Human Handoff
8. Knowledge Base
9. Document Upload
10. Embeddings
11. Retrieval
12. Suggested Replies
13. AI Business Responses
14. Additional Channels

---

## Why Development Order Differs

Architecture Order explains dependencies.

Development Order explains execution strategy.

Example:

Knowledge Base appears before Inbox in architecture.

Inbox appears before Knowledge Base in development.

Reason:

The inbox becomes the testing surface for every future AI capability.

Without a working inbox:

* Retrieval cannot be tested.
* Suggested replies cannot be tested.
* AI responses cannot be tested.

---

# Runtime Execution Order

Runtime Execution Order describes what happens when a lead communicates.

Lead Message
↓
Conversation Created
↓
Inbox Updated
↓
LeadAI Agent Triggered
↓
Knowledge Retrieval
↓
Context Assembly
↓
Response Generation
↓
Conversation Updated
↓
Human Escalation (if required)

---

# Core Ownership Domains

LeadAI should own:

* Lead Model
* Conversation Model
* AI Model
* Inbox Model
* CRM Model
* Workflow Model

These represent long-term product value.

---

# Commodity Domains

LeadAI should not prioritize ownership of:

* Email Transport
* SMS Transport
* WhatsApp Transport
* Instagram Transport
* Facebook Transport

These are communication transports.

They are not the product.

---

# Current Architectural Focus

Current Priority:

Inbox Operations

Includes:

* Realtime Updates
* Human Reply
* Unread Counts
* AI/Human Handoff

Future Priority:

Business Intelligence Layer

Includes:

* Knowledge Base
* Retrieval
* AI Business Context
* Suggested Responses

The inbox must become operational before the intelligence layer is introduced.
