# Hierarchical Subagent Orchestration Rules

## 1. Subagent Hierarchy & Roles
- **Main Orchestrator Agent**: Manages overall goal planning, system architecture, task breakdown, and final synthesis.
- **`subagent-frontend`**: Primary domain subagent scoped to `frontend/`. Responsible for Next.js App Router, React 19 UI components, Tailwind CSS, and RTK Query client slices.
- **`subagent-backend`**: Primary domain subagent scoped to `backend/`. Responsible for Express.js routes, ES Modules, PostgreSQL schemas, RBAC middleware, and security headers.
- **`subagent-testing`**: Primary domain subagent responsible for automated test execution (`node --test`), Next.js build validation, and E2E visual browser testing (`browser_subagent`).

## 2. Child Parallel Worker Delegation
- Primary domain subagents MAY spawn child worker subagents to code or test in parallel.
- **Disjoint Scope Requirement**: Parallel child worker subagents MUST operate on distinct, non-overlapping file paths (e.g. Worker 1 edits `frontend/app/sales/page.js` while Worker 2 edits `frontend/app/inventory/page.js`).
- Child workers report status and diffs back to their parent domain subagent upon completion.

## 3. Communication & Joining Protocol
- Parent subagents aggregate outputs from child workers before returning final results to the Main Orchestrator.
- Always perform build and lint validation after parallel worker edits finish.

## 4. Active Subagent Tracking & Walkthrough Reporting
- In progress updates during execution, the agent MUST state active running subagents (e.g., `[Active Subagents: 2 - subagent-frontend, subagent-backend]`).
- In `walkthrough.md`, include a dedicated **Subagent Execution Breakdown** table listing all spawned subagents, their role, assigned target files, and execution status.

