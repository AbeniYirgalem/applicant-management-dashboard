# INFNOVA Applicant Management Dashboard

A responsive dashboard for reviewing and managing internship applications. It provides authenticated access to dashboard statistics, applicant search and filtering, applicant detail review, and application-status updates.

## Features

- Secure sign-in flow with token-based authentication
- Clear authentication error feedback for offline, timeout, validation, invalid-credential, session-expiry, server, and unexpected failures
- Dashboard summary statistics
- Applicant search, filters, sorting, and pagination
- Responsive applicant table and mobile cards
- Applicant details drawer with status-update confirmation
- Logout confirmation dialog and session-expiry handling
- Light and dark theme support

## Tech stack

- Next.js 16 and React 19
- TypeScript
- Tailwind CSS
- TanStack Query
- Axios
- React Hook Form with Zod validation
- Radix UI primitives and Sonner notifications

## Prerequisites

- Node.js 20 or later
- npm
- A compatible backend API

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create your local environment file:

   ```bash
   Copy-Item .env.example .env
   ```

3. Set the backend API URL in `.env`:

   ```env
   NEXT_PUBLIC_API_BASE_URL=https://your-api.example.com
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available scripts

| Command         | Description                                                |
| --------------- | ---------------------------------------------------------- |
| `npm run dev`   | Starts the local development server.                       |
| `npm run lint`  | Runs ESLint checks.                                        |
| `npm run build` | Creates a production build and runs TypeScript validation. |
| `npm run start` | Starts the production server after a successful build.     |

## Routes

| Route                   | Purpose                                                     |
| ----------------------- | ----------------------------------------------------------- |
| `/login`                | Sign-in page.                                               |
| `/dashboard`            | Dashboard statistics overview.                              |
| `/dashboard/applicants` | Applicant search, filtering, review, and status management. |

## Backend API expectations

The client uses `NEXT_PUBLIC_API_BASE_URL` as the Axios base URL and calls these endpoints:

| Method  | Endpoint                 | Purpose                                      |
| ------- | ------------------------ | -------------------------------------------- |
| `POST`  | `/auth/login`            | Authenticates a user.                        |
| `GET`   | `/dashboard/summary`     | Retrieves summary dashboard data.            |
| `GET`   | `/applicants`            | Retrieves paginated applicants with filters. |
| `GET`   | `/applicants/:id`        | Retrieves one applicant.                     |
| `PATCH` | `/applicants/:id/status` | Updates an applicant status.                 |

Authentication tokens are stored in a browser cookie and sent as a Bearer token for authenticated API requests.

## Error handling

Authentication and API failures are normalized centrally. The login experience provides user-friendly feedback for network failures, timeouts, invalid credentials, validation errors, server errors, and unknown failures. A protected-request `401` clears the session and returns the user to the login page.

## Project structure

```text
src/
  app/          Next.js routes and page entry points
  components/   Reusable UI, layout, dashboard, and applicant components
  constants/    Routes, API endpoints, navigation, and query keys
  hooks/        Query and application hooks
  providers/    Theme, query, and authentication providers
  services/     Axios client and backend API calls
  types/        Shared TypeScript types
```

## Quality checks

Before submitting changes, run:

```bash
npm run lint
npm run build
```
