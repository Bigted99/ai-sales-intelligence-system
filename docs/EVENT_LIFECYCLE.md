# LeadAI Event Lifecycle

## Purpose

This document defines how business events move through LeadAI.

It does not describe implementation details.

It defines the sequence of events that occur as LeadAI processes leads, conversations, AI decisions, communication, and operational monitoring.

Every feature added to LeadAI should integrate into one or more lifecycle stages.

---

# Core Principle

LeadAI is event-driven.

Every significant action creates a business event.

Those events are processed by the appropriate engine.

No engine owns another engine's responsibilities.

---

# Primary Lifecycle

Lead Created
        │
        ▼
Conversation Started
        │
        ▼
AI Qualification
        │
        ▼
Workflow Decision
        │
        ▼
Outbound Communication
        │
        ▼
Delivery Monitoring
        │
        ▼
Reply Received
        │
        ▼
Human / AI Collaboration
        │
        ▼
Conversation Closed
        │
        ▼
Lead Converted or Archived

---

# Stage 1 — Lead Created

## Trigger

Lead submits:

- Website form
- API
- Future integrations

## Engine

CRM Engine

## Responsibilities

Create Lead

Store:

- name
- email
- phone
- original message
- client
- source

## Output Event

LeadCreated

---

# Stage 2 — Conversation Started

## Trigger

LeadCreated

## Engine

Conversation Engine

## Responsibilities

Automatically create the first conversation event.

Example

Channel

web_form

Direction

inbound

Sender

lead

Message

Original enquiry

The inbox is now aware of the lead.

---

# Stage 3 — AI Qualification

## Trigger

ConversationStarted

## Engine

AI Engine

## Responsibilities

Analyse:

- intent
- urgency
- confidence
- summary
- objection risk
- suggested action

Update CRM.

No communication occurs here.

Output

LeadQualified

---

# Stage 4 — Workflow Decision

## Trigger

LeadQualified

## Engine

Workflow Engine

## Responsibilities

Determine next action.

Examples

Send AI response

Create task

Require approval

Pause AI

Escalate

Retry

Output

WorkflowDecisionMade

---

# Stage 5 — Outbound Communication

## Trigger

WorkflowDecisionMade

## Engine

Communication Engine

## Responsibilities

Deliver through:

- Email
- WhatsApp
- SMS
- Instagram
- Future channels

Infrastructure only.

No conversation logic.

Output

MessageSent

MessageFailed

---

# Stage 6 — Delivery Monitoring

## Trigger

Provider Response

## Engine

Workflow Engine

## Responsibilities

Monitor

Delivered

Opened

Clicked

Bounced

Authentication failures

Timeouts

Retries

Log operational events.

Never modify conversation history.

Output

DeliveryConfirmed

DeliveryFailed

---

# Stage 7 — Conversation Updated

## Trigger

Communication Event

## Engine

Conversation Engine

## Responsibilities

Append communication event.

Examples

AI reply

Lead reply

Human reply

Never overwrite.

Every message becomes a new conversation event.

Output

ConversationUpdated

---

# Stage 8 — Reply Received

## Trigger

Inbound channel monitoring

## Engine

Communication Engine

## Responsibilities

Validate

Sender

Thread

Channel

Provider

If valid

Generate communication event.

If invalid

Generate workflow event.

Never silently discard.

Output

InboundMessageValidated

InboundMessageRejected

---

# Stage 9 — Human / AI Collaboration

## Engine

Conversation Engine

AI Engine

Workflow Engine

## Examples

Human takes over

AI paused

AI resumed

Suggested replies

Internal notes

Approval required

All communication continues inside the same conversation.

---

# Stage 10 — Conversation Closed

## Trigger

Manual

Automatic

Business rule

## Responsibilities

Mark conversation complete.

Conversation remains immutable.

No history is deleted.

---

# Stage 11 — Lead Outcome

## Engine

CRM Engine

Examples

Customer

Lost

Archived

Spam

Duplicate

Converted

Lead lifecycle changes.

Conversation history remains intact.

---

# Failure Lifecycle

Lead Created

↓

AI Failure

↓

Workflow Event

↓

Task Created

↓

Operator Resolution

↓

Retry

Failures never modify conversation history.

Failures belong to Workflow Engine.

---

# Future Channel Lifecycle

Instagram

↓

Communication Engine

↓

Validate Sender

↓

Conversation Engine

↓

Inbox

↓

AI Decision

↓

Communication Engine

↓

Instagram Reply

The inbox never needs to know which provider delivered the message.

It only displays conversation events.

---

# Development Order

Conversation Engine Foundation

↓

Realtime Conversations

↓

Human Reply

↓

Email Monitoring

↓

Channel Monitoring

↓

Workflow Monitoring

↓

Multi-channel Communication

↓

Conversation Intelligence

---

# Architectural Rules

## CRM owns people.

## Conversation Engine owns communication.

## Communication Engine owns delivery.

## Workflow Engine owns operational events.

## AI Engine owns intelligence.

## Knowledge Engine owns information.

No engine may assume responsibility for another engine.

---

# LeadAI Philosophy

LeadAI is not built around pages.

LeadAI is built around business events.

Pages are simply windows into those events.