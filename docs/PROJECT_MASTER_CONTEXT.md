# PROJECT_MASTER_CONTEXT.md

# LeadAI

## Product Vision

LeadAI is an AI-first lead handling platform.

The goal of LeadAI is to help businesses capture, qualify, communicate with, and convert leads more efficiently using AI.

LeadAI is not a generic communication platform.

Communication channels are inputs and outputs.

The AI workflow is the product.

---

## Core Mission

Turn every incoming lead into a structured opportunity.

LeadAI should:

* Capture leads
* Qualify leads
* Understand lead intent
* Communicate with leads
* Escalate to humans when necessary
* Track conversation history
* Provide business intelligence

---

## Product Philosophy

Before implementing any feature ask:

Does this improve LeadAI's ability to handle leads?

or

Does this improve LeadAI's ability to behave like a generic inbox?

Prioritize lead handling.

Avoid becoming another Chatwoot clone.

---

## Current Technology Stack

Frontend

* Next.js
* TypeScript
* TailwindCSS

Backend

* Supabase
* PostgreSQL
* Realtime

Automation

* n8n

Artificial Intelligence

* Ollama
* Mistral 7B (production)
* Qwen Coder (development)

---

## Core Entities

Client

Represents a business using LeadAI.

Lead

Represents a potential customer.

Conversation

Stores communication history.

Lead Activity

Stores actions taken on a lead.

Knowledge Document

Stores business knowledge.

Workflow

Stores automation logic.

Agent

Represents LeadAI reasoning systems.

---

## Current Product Status

Completed

* Lead Capture
* Lead Qualification
* Lead Scoring
* Lead Summary
* Opening Message Generation
* Dashboard
* Lead Details
* Lead Status Management
* Activities Timeline
* Conversation Storage
* Inbox Foundation
* Conversation View
* Sender Types (Lead, AI, Human)

In Progress

* Realtime Messaging
* Human Reply System
* Unread Message System
* AI/Human Handoff
* White Label Foundation

Not Started

* Knowledge Base
* Document Upload
* Embeddings
* Retrieval
* Suggested Replies
* AI Business Context
* Multi Channel Integrations
* Billing
* Team Collaboration

---

## Current Definition Of Success

A business owner can:

1. Capture leads.
2. Understand lead quality.
3. Track conversations.
4. View AI insights.
5. Respond when necessary.
6. Move leads through a pipeline.
7. Close more deals.

---

## Long Term Vision

LeadAI becomes an AI sales operator.

The AI should:

* Understand the business
* Understand the lead
* Recommend actions
* Draft responses
* Automate repetitive communication
* Escalate complex conversations

Humans remain in control.

AI increases efficiency.

Businesses close more deals.

---

## Non Goals

LeadAI is not trying to become:

* A generic CRM
* A generic messaging platform
* A generic helpdesk
* A social media management tool

Those features are only valuable when they improve lead handling.





# AI Lead Intelligence SaaS

Purpose:
Multi-tenant AI lead qualification platform.

Stack:
- Next.js
- Supabase
- n8n
- Python
- Ollama

Flow:
Lead Form
→ API Route
→ n8n Webhook
→ AI Analysis
→ Supabase
→ Dashboard


## Current Lead Flow

ContactForm.tsx
↓
POST /api/lead
↓
n8n webhook
↓
AI analysis
↓
Insert into leads table
↓
Dashboard

# PROJECT OVERVIEW

Project Name:
LeadAI

Purpose:
Multi-tenant AI Lead Qualification Platform.

Mission:
Allow businesses to capture inbound leads, automatically qualify them using AI,
generate summaries, recommend next actions, and assist with outreach.

Current Stage:
MVP / Production Validation

Primary Owner:
Antonio

---

# CORE TECH STACK

Frontend
- Next.js (App Router)
- TypeScript
- TailwindCSS

Backend
- Next.js API Routes

Database
- Supabase

Authentication
- Supabase Auth

Automation
- n8n

AI
- Ollama
- Mistral

Future AI
- OpenAI
- Claude

Deployment
- TBD

---

# SYSTEM ARCHITECTURE

PUBLIC FORM
    ↓
Next.js Form
    ↓
/api/lead
    ↓
n8n Webhook
    ↓
AI Qualification
    ↓
Supabase Update
    ↓
Dashboard

---

# MULTI TENANCY MODEL

Tenant Model:
One Client = One Business Account

Relationship:

clients
    ↓
leads
    ↓
lead_activities

Client owns many leads.

Every lead must belong to exactly one client_id.

No lead should ever exist without client ownership.

---

# CURRENT DATABASE TABLES

## clients

Purpose:
Stores tenant/business accounts.

Important Fields:
- id
- company_name
- slug
- support_email
- website
- brand_color
- onboarding_completed

---

## leads

Purpose:
Stores inbound prospects.

Important Fields:
- id
- client_id
- name
- email
- phone
- message

AI Fields:
- qualification_score
- intent_level
- urgency_level
- confidence_level
- human_summary
- opening_message
- next_action

Lifecycle:
- status
- lifecycle_stage
- conversation_owner

Automation:
- ai_followup_enabled
- ai_paused

Tracking:
- created_at
- updated_at

---

## lead_activities

Purpose:
Timeline history for leads.

Examples:
- Lead created
- AI analyzed
- Human contacted
- Status changed

---

## workflow_events

Purpose:
Stores workflow execution history.

Used For:
- debugging
- audit trail
- automation visibility

---

## automation_rules

Purpose:
Stores automation configurations.

---

## conversation_channels

Purpose:
Stores communication channels.

Examples:
- Email
- SMS
- WhatsApp
- Future integrations

---

# NEXTJS FOLDER STRUCTURE



app/
 favoicon
 #global.css
├──layout.tsx

 ├─ (marketing)
 │   ├─ contact/page.tsx
 │   ├─ login/page.tsx
     ├─ signup/page.tsx
   ├─ layout.tsx
   ├─  page.tsx

├─ api
│   └─ lead/route.ts

├── onboarding/page.tsx

├── thank-you/page.tsx

├── dashboard/
│   ├── page.tsx
│   └── leads/
│       └── [id]/
│           └── page.tsx 
|   └── messages/
        └── page.tsx
│       └── [id]/
│           └── page.tsx
│
├── client/
│   └── [slug]/
│       └── page.tsx
|
|
components/
├─ ContactForm.tsx
├─ HeroCarousel.tsx
├─ NavBarComponent.tsx
├── dashboard/
│   ├── ActivityFeed.tsx
    ├── AiInsights.tsx
    ├── AiOutreach.tsx
    ├── DashboardSidebar.tsx
    ├── ConversationCard.tsx
    ├── LeadActionMenu.tsx
    ├── LeadMetricsMenu.tsx
    ├── LeadDetailsModal.tsx
    ├── LeadRowComponent.tsx
    ├── LeadMetricsChart.tsx
    ├── LeadTimeline.tsx
    ├── NextActionCard.tsx
    ├── KpiCard.tsx

├── lib/
    ├── formatters.ts
    ├── leadInsights.ts
    ├── logActivity.ts
    ├── uiMappings.ts
    ├── supabase.ts





 ## ContactForm

Location:
components/ContactForm.tsx

Purpose:
Public lead capture form.

Calls:
POST /api/lead

Important:
Generates idempotency_key.
Requires authenticated user.





# IMPORTANT FILES

## app/api/lead/route.ts

Purpose:
Main lead intake endpoint.

Responsibilities:
- validate requests
- authenticate tenant
- generate idempotency handling
- forward data to n8n

Expected Payload:

{
  name,
  email,
  phone,
  message,
  client_id,
  idempotency_key
}

---

## components/ContactForm.tsx

Purpose:
Public lead capture form.

Flow:

User
 ↓
ContactForm
 ↓
/api/lead
 ↓
n8n
 ↓
Supabase

IMPORTANT:
This form is expected to trigger workflow execution.

---

## app/client/[slug]/page.tsx

Purpose:
White-label client intake page.

Current Status:
Needs verification that it uses the same lead processing path
as ContactForm.

Potential Risk:
Direct database insert may bypass workflow.

---

## app/dashboard/page.tsx

Purpose:
Lead dashboard.

Responsibilities:
- list leads
- display metrics
- display AI insights

---

## app/dashboard/leads/[id]/page.tsx

Purpose:
Lead detail view.

Responsibilities:
- show AI summary
- show next action
- show qualification score
- show lead timeline

---

# N8N WORKFLOWS

## NextJS – AI Lead Automation

Status:
ACTIVE

Workflow ID:
Z5tl68475RQMtyVb

Trigger:
Webhook

Expected Input:

{
  name,
  email,
  phone,
  message,
  client_id,
  idempotency_key
}

Responsibilities:

1. Receive lead
2. Run AI analysis
3. Generate:
   - qualification score
   - intent level
   - confidence
   - summary
   - next action
4. Update Supabase
5. Log activity

---

# SUPABASE AUTOMATIONS

Database Webhooks:
Review periodically.

Rule:
No orphaned webhook should remain active.

If a workflow is deleted:
Delete associated database webhook.

---

# MAJOR DECISIONS

## Decision 001

Date:
2026

Decision:
Use database as source of truth.

Reason:
Workflows can change without breaking frontend.

---

## Decision 002

Date:
2026

Decision:
Multi-tenant architecture.

Reason:
One codebase serves many businesses.

---

## Decision 003

Date:
2026

Decision:
AI recommends actions.
Human approves actions.

Reason:
Avoid autonomous communication mistakes.

---

# ACTIVE ISSUES

Issue:
Bando submissions inserted into leads table
but workflow processing did not occur.

Status:
Investigating.

Known Facts:
- Lead record exists.
- created_at exists.
- AI fields remain null.
- Workflow did not complete.

---

# DEBUG CHECKLIST

When workflow fails:

1. Confirm lead inserted.
2. Confirm client_id exists.
3. Confirm webhook received request.
4. Confirm n8n execution exists.
5. Confirm AI node executed.
6. Confirm Supabase update executed.
7. Confirm lead_activities written.

---

# CURRENT PRIORITIES

Priority 1
Reliable lead ingestion.

Priority 2
Reliable AI qualification.

Priority 3
Multi-tenant onboarding.

Priority 4
Workflow observability.

Priority 5
Production deployment.

---

# NEXT SESSION START HERE

Current Goal:

________________________________

Last Working State:

________________________________

Current Hypothesis:

________________________________

Next Step:

________________________________

Blockers:

________________________________

Notes:

________________________________

---
END OF FILE