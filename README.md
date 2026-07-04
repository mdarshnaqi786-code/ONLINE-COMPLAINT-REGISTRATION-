# Online Complaint Registration — Updated Project

This is your full project (backend + frontend, minus `node_modules` —
just run `npm install` in each folder as usual) with the complaint-portal
fixes from before included, plus a UI/security pass across the rest of
the app.

## 1. The original bug — status mismatch on the user's "My Complaints" page

Your agent sets a complaint's status to one of **4 values**: `Assigned`,
`Accepted`, `Rejected`, `Completed`. The old `Status.jsx` only recognized
**3 different** words: `Pending`, `Resolved`, `Rejected`. So an assigned
or completed complaint showed no badge, and the "Resolved" stat card was
always stuck at 0.

**Fix:** `frontend/src/utils/statusConfig.js` is now the single source of
truth for status labels/colors/icons, used everywhere a status is shown
(`Status.jsx`, `HomePage.jsx`, `AgentComplaints.jsx`, `ComplaintInfo.jsx`).

## 2. Security issues found and fixed

- **Any logged-in user could view/edit/delete another user's complaint**
  by guessing its ID — `getComplaintById`, `updateComplaint`, and
  `deleteComplaint` had no ownership check. Fixed in
  `controllers/complaintController.js`.
- **A complaint could be edited/deleted after an agent had already picked
  it up**, silently breaking the agent's work. Both endpoints now require
  the complaint to still be `Pending`.
- **Any agent could update any assignment**, not just the ones assigned to
  them. Fixed in `controllers/agentController.js`.
- **`/api/admin/*` and `/api/agent/*` had no role check at all** — a
  regular citizen who was simply logged in could call admin/agent
  endpoints directly (view all users, assign complaints, etc.), since the
  `protect` middleware only checks that the JWT is valid, not the role it
  belongs to. Added `middleware/roleMiddleware.js` (`authorize(...roles)`)
  and applied it to `adminRoutes.js` (Admin only) and `agentRoutes.js`
  (Agent only).
- **Sign-up let anyone create an Admin or Agent account** — the public
  registration form had a role dropdown with `Admin`/`Agent` as options.
  Removed it; the public sign-up form now always creates a `User`
  (citizen) account. Agent/Admin accounts should be provisioned
  separately (e.g. seeded directly or created by an existing Admin) —
  there's no self-service path to those roles anymore.
- **Frontend had no route guards at all** — `/admin/home`, `/agent/home`,
  `/user/status`, etc. were reachable just by typing the URL, logged in
  or not, any role. Added `components/common/ProtectedRoute.jsx` and
  wired it into every dashboard route in `App.jsx`; a user is redirected
  to `/login` if signed out, or to their own dashboard if they try to
  visit a route for a different role.

## 3. UI pass (whole app, not just the user pages)

- **Status.jsx** — correct status badges, shows the assigned officer's
  name/email (backend already sent this, it just wasn't displayed),
  Edit/Delete lock with an explanation once a complaint leaves `Pending`,
  skeleton loading state, cleaner stat cards.
- **HomePage.jsx** — live snapshot stats, "Recent Complaints" section,
  working logout button (previous version cleared `localStorage` from
  inside a `<Link>`'s `onClick`, which worked but was fragile — now a
  proper button + `navigate`).
- **Complaint.jsx / EditComplaint.jsx** — labeled fields, back link,
  consistent spacing, `EditComplaint` shows a clear message instead of a
  broken form if the complaint is no longer editable.
- **Login.jsx / SignUp.jsx** — matched to the same visual language
  (rounded fields, consistent focus rings, consistent error styling),
  centered the show/hide password icon properly.
- **Navbar.jsx** — the mobile hamburger button previously had **no click
  handler at all**, so the mobile menu never opened. It's now a working
  slide-down menu.
- **AdminHome.jsx / AgentHome.jsx** — same logout-button fix as
  `HomePage.jsx`, refreshed dashboard cards.
- **AgentComplaints.jsx** — now uses the shared status config, added
  status-count cards, disabled state on the dropdown while a status
  update is in flight.
- **ComplaintInfo.jsx (admin)** — now uses the shared status config
  instead of its own separate copy of the same logic, disabled state
  while assigning.
- **UserInfo.jsx / AgentInfo.jsx** — skeleton loading states, spacing
  made consistent with the rest of the app.

## Where things live (in case you're diffing against your original)

```
backend/
  middleware/roleMiddleware.js       ← new
  routes/adminRoutes.js              ← now requires Admin role
  routes/agentRoutes.js              ← now requires Agent role
  controllers/complaintController.js ← ownership + Pending-only guards
  controllers/agentController.js     ← ownership guard on status updates

frontend/src/
  utils/statusConfig.js                    ← new, shared status source of truth
  components/common/ProtectedRoute.jsx     ← new, route guard
  components/common/Navbar.jsx             ← mobile menu fix
  components/common/Login.jsx              ← visual polish
  components/common/SignUp.jsx             ← removed role dropdown, visual polish
  components/user/*.jsx                    ← rebuilt (see previous changelog)
  components/admin/AdminHome.jsx           ← logout fix, polish
  components/admin/UserInfo.jsx            ← polish
  components/admin/AgentInfo.jsx           ← polish
  components/admin/ComplaintInfo.jsx       ← shared status config
  components/agent/AgentHome.jsx           ← logout fix, polish
  components/agent/AgentComplaints.jsx     ← shared status config, polish
  App.jsx                                  ← route guards wired in
```

No new npm packages are required anywhere — everything uses libraries
already in your `package.json` files (`react-icons`, `axios`,
`react-router-dom`, `express`, `jsonwebtoken`, etc).

## Still worth doing (not done here, out of scope for a UI/bug pass)

- The agent's status dropdown still technically allows going "backwards"
  (e.g. `Completed` → `Assigned`). If your instructions require a strict
  one-directional workflow, you'd add that check in
  `agentController.updateComplaintStatus`.
- There's currently no in-app way for an Admin to create Agent accounts —
  worth adding if your grading rubric expects the "Admin approves officer
  accounts" flow described in your Roles & Responsibilities doc.
