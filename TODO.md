# DEVI Homeopathy Clinic - Build TODO

## Phase 1: Foundation (Frontend + Backend)
- [x] Inspect existing repo structure and skeleton code.
- [x] Identify broken/duplicated Contact page.
- [x] Create Tailwind + premium theme baseline (colors, dark mode, typography, glassmorphism helpers).
- [x] Wire frontend providers: Helmet Async, React Hot Toast, Context, Router layouts.
- [x] Replace Navbar with premium responsive navbar.
- [x] Fix/replace existing pages (Home/About/Contact) and add placeholders for required routes (Contact page repaired).
- [x] Add API layer on frontend (axios instance, auth token handling).
- [x] Backend: add security middleware (helmet, cors, rate limiting) + error handling.
- [x] Backend: implement JWT auth scaffolding + role middleware.
- [x] Backend: implement environment/config scaffolding (.env.example).

## Phase 2: Models & APIs
- [x] Expand Mongoose models to match required collections.
- [x] Implement REST routes/controllers for appointments, treatments, blogs, courses, lessons, feedback, testimonials.
- [x] Add Cloudinary + Nodemailer service scaffolding.
- [x] Add Certificate model + admin issue/list/revoke and public verify routes.

## Phase 3: UX Pages / Feature Flows
- [x] Implement Appointment system (RHF, upload, consent, appointment ID, email confirmation).
- [x] Implement Admin appointment panel (filters, status badges, CSV export).
- [x] Implement Patient portal (register/login + dashboard).
- [x] Implement Forgot-password + Reset-password UI (backed by existing auth routes).
- [x] Implement public Treatments listing + detail (hybrid API + sample data).
- [x] Implement public Blog listing + detail (hybrid API + sample data).
- [x] Implement Courses/LMS public listing + detail (lessons, enrolment, free previews).
- [x] Implement Videos library (YouTube embed with lightbox).
- [x] Implement Feedback submission + approved-feedback display.
- [x] Implement Admin dashboard shell + sidebar layout.
- [x] Implement Blog CMS (list/create/edit/delete with markdown-style editor).
- [x] Implement Courses admin (courses CRUD + inline lessons manager).
- [x] Implement Feedback moderation panel (approve/reject with tabs).
- [x] Implement Certificates admin (issue, revoke, printable preview, QR code).
- [x] Implement public Certificate verification page (`/verify/:code`).

## Phase 4: SEO + Deployment Readiness
- [ ] Add sitemap.xml/robots.txt generation strategy.
- [ ] Expand OpenGraph/Twitter/schema markup per page.
- [ ] Add deployment-ready scripts/config (build, env docs, one-click deploy).

## Notes for the user
- Drop `logo-horizontal.png` and `logo-stacked.png` into `frontend/public/` (text fallback renders until then). See `frontend/public/LOGO_README.md`.
- The public pages fetch live data from the API when connected to MongoDB. When the API is empty or unreachable, the bundled sample content renders so the site always looks complete.
- To try the admin CMS, register an account, then in Mongo shell set `role: 'admin'` on your user document, and visit `/admin`.
- Certificate QR codes use `api.qrserver.com` at render time — no npm dependency needed. You can swap in a self-hosted QR generator later.
