# LeadAI Conversation Engine Architecture

## Vision

The Conversation Engine is the communication core of LeadAI.

Every interaction between a business and a customer should eventually become part of a conversation, regardless of where it originated.

LeadAI does not manage channels.

LeadAI manages conversations.

Channels are simply transport mechanisms.

---

# Core Principle

One person.

One conversation.

Many events.

Many channels.

---

# Primary Objects

## Lead

Represents a person or organization.

Responsible for:

- Qualification
- AI Summary
- AI Score
- Intent
- Lifecycle
- Ownership

Table:

leads

---

## Conversation

Represents the communication thread.

A conversation stores messages.

A lead can have one active conversation.

Future support:

- Email
- Web Forms
- WhatsApp
- Instagram
- Messenger
- SMS
- Voice
- Slack

Table:

conversations

---

## Conversation Event

Represents something that happened inside a conversation.

Examples:

- conversation_started
- message_received
- ai_reply_generated
- ai_reply_sent
- email_delivered
- email_failed
- lead_replied
- human_reply
- human_takeover
- conversation_closed

Table:

conversation_events

Conversation Events are immutable.

Nothing edits history.

Everything appends history.

---

## Communication Channel

Represents a connected integration.

Examples:

- Gmail
- Outlook
- WhatsApp
- Twilio
- Instagram
- Messenger

Responsible for:

- Authentication
- Connection status
- Provider configuration

Table:

communication_channels

Channels never store conversations.

Channels only move messages.

---

## Workflow Event

Represents internal automation.

Examples:

- AI Started
- AI Completed
- Webhook Failed
- Retry Scheduled
- Queue Timeout

Table:

workflow_events

Workflow Events describe system activity.

Not customer activity.

---

## Lead Activity

Represents CRM timeline entries.

Examples:

- Lead Created
- Demo Scheduled
- Proposal Sent
- Opportunity Won

Table:

lead_activities

Lead Activities describe business actions.

Not communication.

---

## Task

Represents work.

Examples:

- Call Lead
- Review AI Reply
- Schedule Demo
- Verify Contact

Tasks can be:

- Human
- AI
- Approval

Table:

tasks

---

# Conversation Lifecycle

Lead Created

↓

Conversation Started

↓

Opening Message Generated

↓

Opening Message Sent

↓

Delivery Confirmed

↓

Lead Replied

↓

AI Decision

↓

Human Reply OR AI Reply

↓

Conversation Continues

↓

Conversation Closed

---

# Future Channel Flow

Web Form

↓

Conversation

↓

Email

↓

Lead Replies

↓

Email Monitor

↓

Conversation Event

↓

Realtime Dashboard

↓

Human Reply

↓

Email Provider

↓

Delivery Status

↓

Conversation Event

↓

Dashboard Updates

The conversation remains the same.

Only the channel changes.

---

# Design Rules

Rule 1

Every communication belongs to one Conversation.

---

Rule 2

Every state change creates a Conversation Event.

Never overwrite history.

---

Rule 3

Communication Channels transport messages.

They never own conversations.

---

Rule 4

Workflow Events describe automation.

Conversation Events describe communication.

Lead Activities describe CRM history.

Tasks describe work.

Never mix responsibilities.

---

Rule 5

Realtime is a UI concern.

Conversation Events are the source of truth.

Realtime only reflects Conversation Events.

---

Rule 6

Failures are first-class events.

Examples:

email_failed

delivery_failed

provider_timeout

invalid_recipient

These should never silently disappear.

---

Rule 7

AI never bypasses the Conversation Engine.

Every AI action becomes a Conversation Event.

---

# Long-Term Goal

LeadAI becomes a Communication Intelligence Platform.

Every communication channel feeds the same Conversation Engine.

The dashboard, AI, analytics, automation, tasks, and human operators all consume the same source of truth.

Conversation first.

Everything else builds on top.