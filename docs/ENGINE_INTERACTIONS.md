# LeadAI Engine Interactions

## Purpose

This document defines how LeadAI engines communicate with one another.

Engines never call each other directly.

They communicate through business events.

This keeps LeadAI modular, scalable and easy to extend.

---

# Architecture

                    LeadAI

                         │

        Business Events (Source of Truth)

                         │

 ┌──────────┬──────────┬──────────┬──────────┬──────────┐

 ▼          ▼          ▼          ▼          ▼

CRM     Conversation     AI     Workflow   Communication

Engine     Engine      Engine    Engine       Engine

                         │

                         ▼

                 Knowledge Engine

---

# Event Philosophy

Every engine:

• Owns its own data.

• Emits events.

• Reacts to events.

No engine directly owns another engine's logic.

---

# CRM Engine

## Emits

LeadCreated

LeadUpdated

LeadAssigned

LeadConverted

LeadArchived

LeadDeleted

## Listens To

LeadQualified

ConversationClosed

CustomerCreated

TaskCompleted

---

# Conversation Engine

## Emits

ConversationStarted

ConversationUpdated

ConversationClosed

HumanReplyAdded

AIReplyAdded

UnreadConversationCreated

## Listens To

LeadCreated

MessageSent

MessageDelivered

InboundMessageValidated

HumanTakeoverEnabled

HumanTakeoverReleased

---

# AI Engine

## Emits

LeadQualified

SummaryGenerated

ReplySuggested

ConfidenceUpdated

KnowledgeRetrieved

## Listens To

ConversationStarted

ConversationUpdated

KnowledgeUpdated

HumanRequestedSuggestion

---

# Workflow Engine

## Emits

WorkflowStarted

WorkflowCompleted

WorkflowFailed

TaskCreated

RetryScheduled

HumanApprovalRequired

DeliveryConfirmed

DeliveryFailed

## Listens To

LeadQualified

MessageSent

ProviderFailure

ConversationUpdated

AIFailure

---

# Communication Engine

## Emits

MessageSent

MessageDelivered

MessageOpened

MessageClicked

MessageFailed

InboundMessageReceived

ProviderConnected

ProviderDisconnected

## Listens To

WorkflowDecisionMade

HumanReplyAdded

AIReplyAdded

RetryScheduled

---

# Knowledge Engine

## Emits

KnowledgeUpdated

DocumentProcessed

EmbeddingsCreated

## Listens To

DocumentUploaded

KnowledgeRequested

---

# Typical Event Chain

Website Form

↓

LeadCreated

↓

ConversationStarted

↓

LeadQualified

↓

WorkflowDecisionMade

↓

MessageSent

↓

DeliveryConfirmed

↓

ConversationUpdated

↓

ReplyReceived

↓

ConversationUpdated

↓

ConversationClosed

↓

LeadConverted

---

# Failure Event Chain

LeadCreated

↓

ConversationStarted

↓

LeadQualified

↓

WorkflowDecisionMade

↓

MessageFailed

↓

WorkflowFailed

↓

TaskCreated

↓

OperatorResolvesIssue

↓

RetryScheduled

↓

MessageSent

---

# Human Takeover Event Chain

ConversationUpdated

↓

AI suggests reply

↓

Human edits

↓

HumanReplyAdded

↓

Communication Engine

↓

Provider

↓

DeliveryConfirmed

↓

ConversationUpdated

---

# Future Multi-Channel Flow

Instagram

↓

InboundMessageReceived

↓

ConversationUpdated

↓

AI Engine

↓

ReplySuggested

↓

Human Approval (optional)

↓

MessageSent

↓

ConversationUpdated

The Inbox never needs to know the provider.

Only the Communication Engine knows.

---

# Design Rules

Engines never write into another engine's tables.

Engines communicate only through business events.

Every event should have one producer.

Every event may have multiple consumers.

Business events are immutable.

Conversation history is append-only.

Workflow history is append-only.

The CRM represents business truth.

The Conversation Engine represents communication truth.

The Workflow Engine represents operational truth.

The Communication Engine represents infrastructure truth.

The AI Engine represents intelligence.

The Knowledge Engine represents organizational knowledge.

---

# Long-Term Vision

LeadAI is not a collection of pages.

LeadAI is an event-driven operating system for customer conversations.

The UI is simply one consumer of those business events.