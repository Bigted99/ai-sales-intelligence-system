# LEADAI - DECISION LOG

Purpose:

Permanent record of major architectural, product, workflow, AI, database, and business decisions.

Rule:

Before changing architecture, workflows, database structure, or automation logic:

CHECK THIS FILE FIRST.

---

# DECISION TEMPLATE

Decision ID:
DEC-XXX

Date:
YYYY-MM-DD

Category:
Architecture | Database | AI | Workflow | Product | Business

Decision:

Reason:

Alternatives Considered:

Expected Benefits:

Risks:

Status:
Active | Deprecated | Replaced

Notes:

---

# ACTIVE DECISIONS

---

Decision ID:
DEC-001

Category:
Architecture

Decision:

LeadAI will be built as a multi-tenant platform.

Reason:

One codebase can serve multiple businesses.

Expected Benefits:

- scalability
- recurring revenue
- centralized maintenance

Status:
Active

---

Decision ID:
DEC-002

Category:
Database

Decision:

clients table is the root ownership table.

Reason:

Every resource must belong to a tenant.

Expected Benefits:

- clean authorization
- tenant isolation
- easier billing

Status:
Active

---

Decision ID:
DEC-003

Category:
Database

Decision:

Every lead must contain client_id.

Reason:

Prevents orphan records.

Expected Benefits:

- easier filtering
- proper ownership
- secure RLS

Status:
Active

---

Decision ID:
DEC-004

Category:
AI

Decision:

AI recommends actions.
Humans approve actions.

Reason:

Avoid autonomous mistakes.

Expected Benefits:

- trust
- safety
- compliance

Status:
Active

---

Decision ID:
DEC-005

Category:
Workflow

Decision:

Lead qualification handled through n8n.

Reason:

Business logic should be separated from frontend.

Expected Benefits:

- modularity
- maintainability
- easier upgrades

Status:
Active

---

Decision ID:
DEC-006

Category:
Workflow

Decision:

Lead intake should occur through webhook architecture.

Reason:

Allows frontend to remain lightweight.

Expected Benefits:

- reusable
- scalable
- automation friendly

Status:
Active

---

Decision ID:
DEC-007

Category:
Database

Decision:

Database is source of truth.

Reason:

Frontend and workflows may change.

Expected Benefits:

- stability
- auditability

Status:
Active

---

Decision ID:
DEC-008

Category:
AI

Decision:

AI output stored in leads table.

Reason:

Dashboard requires immediate access.

Expected Benefits:

- faster UI
- fewer workflow calls

Status:
Active

---

Decision ID:
DEC-009

Category:
Product

Decision:

Lead detail page becomes primary workspace.

Reason:

Sales teams work lead-first.

Expected Benefits:

- better UX
- faster actions

Status:
Active

---

Decision ID:
DEC-010

Category:
Product

Decision:

Timeline system records important actions.

Reason:

Need historical visibility.

Expected Benefits:

- accountability
- audit trail

Status:
Active

---

Decision ID:
DEC-011

Category:
Product

Decision:

White-label intake pages supported.

Example:

/client/[slug]

Reason:

Each business gets branded lead capture.

Expected Benefits:

- multi-tenancy
- customization

Status:
Active

---

Decision ID:
DEC-012

Category:
Workflow

Decision:

Workflow executions should create activity records.

Reason:

Users need visibility into AI actions.

Expected Benefits:

- transparency
- debugging

Status:
Active

---

Decision ID:
DEC-013

Category:
Reliability

Decision:

Use idempotency keys for lead processing.

Reason:

Prevent duplicate workflow execution.

Expected Benefits:

- consistency
- safety

Status:
Active

---

Decision ID:
DEC-014

Category:
Workflow

Decision:

Deleted workflows require cleanup of associated webhooks.

Reason:

Orphan webhooks create confusion and hidden failures.

Expected Benefits:

- cleaner environment
- easier debugging

Status:
Active

---

Decision ID:
DEC-015

Category:
AI

Decision:

AI outputs include:

- qualification score
- intent level
- confidence level
- urgency level
- summary
- opening message
- next action

Reason:

Sales reps need actionable information.

Status:
Active

---

# INVESTIGATION LOG

Purpose:

Tracks unresolved issues.

---

Issue ID:
INV-001

Title:
Bando lead not processed

Date Opened:
2026-05

Status:
Investigating

Known Facts:

- Lead inserted successfully
- Lead appears in Supabase
- AI fields remain NULL
- Workflow completion uncertain

Current Hypotheses:

1.
Webhook not triggered

2.
Workflow execution failed

3.
Lead path differs from original intake path

Next Steps:

- verify webhook execution
- compare lead ingestion paths
- inspect API route

---

Issue ID:
INV-002

Title:
Legacy database webhook

Status:
Resolved

Summary:

Old Supabase webhook pointed to deleted workflow.

Action Taken:

Webhook removed.

Outcome:

Eliminated unnecessary trigger path.

---

# LESSONS LEARNED

Lesson:

Never assume a lead passed through workflow simply because it exists in the database.

Date:
2026

---

Lesson:

Every lead ingestion path must be mapped.

Date:
2026

---

Lesson:

Multi-tenant features increase debugging complexity.

Date:
2026

---

Lesson:

Document architecture changes immediately.

Date:
2026

---

# FUTURE DECISIONS

Place proposed decisions here before implementation.

---

Proposal ID:
PROP-001

Proposal:

Move AI processing to queue system.

Benefits:

- scalability
- retries

Status:
Backlog

---

Proposal ID:
PROP-002

Proposal:

Add workflow monitoring dashboard.

Benefits:

- observability
- easier debugging

Status:
Backlog

---

# SESSION MEMORY

Current Goal:

________________________________

Current Focus:

________________________________

Current Blocker:

________________________________

Last Major Win:

________________________________

Immediate Next Step:

________________________________

---

# PROJECT TIMELINE

Phase 1
MVP Foundation

Status:
Completed

---

Phase 2
Lead Qualification

Status:
Completed

---

Phase 3
Multi-Tenant Support

Status:
In Progress

---

Phase 4
AI Follow-Up System

Status:
Planned

---

Phase 5
Production Deployment

Status:
Planned


Decision ID:
DEC-016

Category:
Multi-Tenant

Decision:

Support custom domains per client.

Examples:

leadai.com/client/plumbingpro

future:

plumbingpro.com
lawyerpro.com
roofingpro.com

Reason:

Professional branding.

Requirements:

- Host based tenant resolution
- Dynamic metadata
- Dynamic OG images
- SEO support
- Social media preview support

Status:
Planned

---

END