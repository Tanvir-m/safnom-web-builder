# Safnom V1 Setup

## Prerequisites

- Node.js 20+ (LTS recommended)
- npm
- MongoDB running locally or a reachable `MONGODB_URI`

## Install

```bash
cd backend && npm install
cd ../frontend && npm install
```

## Environment

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local
```

### Backend variables

| Variable | Default | Description |
|----------|---------|-------------|
| `NODE_ENV` | development | Environment |
| `PORT` | 8080 | HTTP port |
| `MONGODB_URI` | mongodb://localhost:27017/safnom | MongoDB connection |
| `FRONTEND_URL` | http://localhost:3000 | CORS origin |
| `API_PREFIX` | /api/v1 | API mount path |

### Frontend variables

| Variable | Example | Description |
|----------|---------|-------------|
| `NEXT_PUBLIC_API_URL` | /api/v1 | Same-origin API (proxied to backend; see frontend `next.config.ts`) |
| `BACKEND_URL` | http://localhost:8080 | Rewrite target for `/api/v1` |
| `NEXT_PUBLIC_AUTH_COOKIE_NAME` | safnom_token | Must match backend `COOKIE_NAME` |

## Run

Use two terminals (or run only the app you need):

```bash
cd backend && npm run dev
cd frontend && npm run dev
```

## Troubleshooting

**macOS port 5000:** Apple AirPlay Receiver may bind to port 5000. Default SafNom backend uses **8080**; set `PORT` in `backend/.env` and match `BACKEND_URL` in `frontend/.env.local`.

**MongoDB:** The backend exits on startup if it cannot connect to `MONGODB_URI`. Start MongoDB locally or point the variable at a reachable instance.

## Verification checklist

- [ ] Frontend loads at http://localhost:3000
- [ ] `cd frontend && npm run build` succeeds
- [ ] Backend listens on http://localhost:8080
- [ ] `GET /api/v1/health` returns success JSON
- [ ] MongoDB connection succeeds (health `database: connected`)
- [ ] `cd backend && npm run build` succeeds
