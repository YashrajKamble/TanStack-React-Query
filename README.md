# TanStack React Query (Vite + React) ⚡

A small React + Vite project that demonstrates **TanStack React Query v5** with:

- **Paginated queries** (Posts)
- **Dependent UI state + caching** (Tags)
- **Mutation + cache invalidation** (Create Post)
- **React Query Devtools** for debugging 🧰

---

## What is this? 🧠

This repo is a **learning/demo app** to understand how TanStack React Query manages:

- **Server state** (fetching, caching, background updates)
- **Loading/error states** without manual boilerplate
- **Pagination UX** using `keepPreviousData`

---

## When should you use TanStack React Query? ✅

Use it when your app needs to work with **API/server data**, like:

- **Lists + pagination** (feeds, tables, catalogs)
- **Caching** to avoid refetching the same data
- **Mutations** (create/update/delete) with automatic refetch/invalidation
- **Optimistic-ish UX patterns** and smooth transitions

Avoid it for **pure local UI state** (inputs, toggles). Keep that in React state.

---

## Tech stack 🧩

- **React** (via Vite)
- **@tanstack/react-query** + **Devtools**
- **Mock API** via `json-server` (recommended) using `src/api/data.json` 📦
- **ESLint** for linting

---

## Getting started (step-by-step) 🚀

### 1) Install dependencies

```bash
npm install
```

### 2) Start the mock API (port 3000)

This project fetches from:

- `GET /posts` (supports pagination)
- `GET /tags`
- `POST /posts`

Run a local JSON API using the provided data file:

```bash
npx json-server@latest --watch "src/api/data.json" --port 3000
```

### 3) Start the frontend (Vite)

```bash
npm run dev
```

Open the app and use the **Devtools** (bottom corner) to inspect caches, keys, and network behavior. 🧰

---

## Available scripts 🛠️

```bash
npm run dev      # start Vite dev server
npm run build    # production build
npm run preview  # preview production build
npm run lint     # run ESLint
```

---

## Project structure 📁

```text
.
├─ public/
│  ├─ favicon.svg
│  └─ icons.svg
├─ src/
│  ├─ api/
│  │  ├─ api.js         # fetchPosts, fetchTags, addPost (HTTP layer)
│  │  └─ data.json      # mock database for json-server
│  ├─ components/
│  │  └─ post-lists.jsx # queries + mutation + pagination UI
│  ├─ App.jsx           # simple toggle to mount/unmount the list
│  └─ main.jsx          # QueryClientProvider + Devtools
├─ vite.config.js
└─ package.json
```

---

## How it works (quick tour) 🧭

- **QueryClient setup**: `src/main.jsx` wraps the app with `QueryClientProvider` and enables Devtools.
- **Posts query**: `src/components/post-lists.jsx`
  - Uses `useQuery` with a key like `["posts", { page }]`
  - Uses `keepPreviousData` so the previous page stays visible while the next page loads
  - Uses `staleTime` to reduce refetching noise
- **Tags query**:
  - Cached with `staleTime: Infinity` because tags rarely change
- **Create post (mutation)**:
  - Uses `useMutation(addPost)`
  - On success, invalidates the posts query to refresh the list

---

## Troubleshooting 🧯

- **API not working / blank list**: make sure the mock API is running on **`http://localhost:3000`**.
- **CORS / network errors**: confirm the endpoint in `src/api/api.js` matches your API port.
- **Pagination buttons disabled**: depends on the API response fields (`prev`/`next`) returned by your json-server pagination setup.

---

## Summary ✅

This project is a compact, practical example of using **TanStack React Query** for real-world server state: **queries, caching, pagination UX, mutations, and cache invalidation**, with Devtools to understand what’s happening under the hood.
