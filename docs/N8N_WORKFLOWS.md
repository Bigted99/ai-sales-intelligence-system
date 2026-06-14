# LEADAI - N8N WORKFLOWS

Last Updated:
[UPDATE DATE]

Purpose:
This document contains every workflow currently active, planned, deprecated, or under investigation.

---

# WORKFLOW STANDARDS

Every workflow must:

1. Accept client_id
2. Be tenant aware
3. Log failures
4. Create workflow_events
5. Never overwrite another tenant's data
6. Support future production deployment

---

# ACTIVE WORKFLOWS

---

## NextJS – AI Lead Automation

Status:
ACTIVE

Workflow ID:
Z5tl68475RQMtyVb

Purpose:
Main lead qualification workflow.

Trigger:
Webhook

Expected Input:

{
  "name": "",
  "email": "",
  "phone": "",
  "message": "",
  "client_id": "",
  "idempotency_key": ""
}

Source:

ContactForm
↓
/api/lead
↓
Webhook

---

Processing Flow

1. Receive webhook

2. Validate payload

3. Check idempotency

4. AI analysis

Outputs:

- qualification_score
- intent_level
- confidence_level
- urgency_level
- human_summary
- opening_message
- next_action

5. Update lead

6. Create lead activity

7. Create workflow event

8. Finish

---

Updates Tables

- leads
- lead_activities
- workflow_events

---

Failure Indicators

- Lead inserted
- AI fields remain NULL

Likely Cause:

Workflow did not execute
OR
Workflow failed before update node

---

# WORKFLOW INPUT CONTRACT

Every lead workflow must receive:

Required:

client_id
name
message

Optional:

email
phone

System:

idempotency_key

---

# WEBHOOK REGISTRY

---

Webhook Name:
nextjs-lead

Status:
ACTIVE

Expected URL:

http://localhost:5678/webhook/nextjs-lead

Production URL:

[TBD]

Used By:

/api/lead

---

# DEPRECATED WORKFLOWS

---

## lead_intake

Status:
REMOVED

Original Purpose:
Database-trigger workflow.

Reason Removed:
Migrated to direct webhook architecture.

Important:

Database webhook must not remain active after workflow removal.

---

# FUTURE WORKFLOWS

---

## AI Follow-up Workflow

Status:
PLANNED

Purpose:
Generate follow-up messages.

Trigger:
Scheduled

---

## Lead Re-engagement Workflow

Status:
PLANNED

Purpose:
Reactivate stale leads.

Trigger:
Timer

---

## Escalation Workflow

Status:
PLANNED

Purpose:
Notify human when high intent lead detected.

Trigger:
Qualification threshold

---

# DEBUGGING PLAYBOOK

If workflow fails:

Step 1
Check lead exists.

Step 2
Check workflow execution exists.

Step 3
Check AI node output.

Step 4
Check Supabase update node.

Step 5
Check workflow_events.

Step 6
Check lead_activities.

Step 7
Check idempotency handling.

---

# CHANGE LOG

Date:
[DATE]

Change:
[DESCRIPTION]

Reason:
[WHY]

---

END