## ERP-Clone — Project Notes (Easy Guide)

This document explains the project in very simple words. Think of it as a beginner’s manual. Hinglish style where helpful.

### What is this project?
- **Goal**: A simple ERP-like Student Portal (login, register, view basic profile).
- **Parts**: Backend (Node/Express + MongoDB) and Frontend (React + Vite + Tailwind).

---

## How the whole flow works
1. User registers on the frontend (uploads a photo). Data goes to backend.
2. Backend stores user in MongoDB, uploads image to Cloudinary, and sends a welcome email with credentials.
3. User logs in from frontend. Backend checks credentials and sets a secure cookie `token` (JWT) in the browser.
4. Frontend calls a protected API `/api/user/fetch` using that cookie to get user details and show them.
5. Logout clears cookie and also blacklists the token on server so it can’t be reused.

Simple Hindi: Register karo → Email aata hai → Login karo → Cookie set hota hai → Data fetch hota hai → Logout par cookie clear aur token block hota hai.

---

## Tech stack
- Backend: Node.js, Express, TypeScript, MongoDB (Mongoose), Cloudinary, Nodemailer, JWT, Multer, Bcrypt
- Frontend: React, Vite, TypeScript, TailwindCSS, React Router, React Hook Form + Zod, Axios

---

## Local Development: How to Run

### 1) Environment variables (very important)
Create a `.env` file in `Backend/` with following keys:

```
PORT=3000
MONGO_URL=mongodb://localhost:27017
JWT_SECRET=your_jwt_secret

# Cloudinary
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_SECRET_KEY=your_secret_key

# Gmail (for Nodemailer)
USER=your_gmail_address
PASS=your_gmail_app_password
```

Note: For Gmail, enable “App Passwords” and use that for `PASS`. Normal password won’t work.

### 2) Start Backend
```
cd Backend
npm install
npm run dev
```
Server runs at `http://localhost:3000`.

### 3) Start Frontend
```
cd Frontend
npm install
npm run dev
```
App opens at `http://localhost:5173`.

Cookie/CORS are already configured for `http://localhost:5173` in backend.

---

## Backend Overview (folder: `Backend/src`)

### Entry: `server.ts`
- Sets up Express server and middlewares.
- Enables CORS for `http://localhost:5173` and cookies.
- Connects MongoDB and Cloudinary.
- Mounts user routes at `/api/user`.

### Routes: `routes/user.route.ts`
- `POST /api/user/create`: Register a user (with image upload).
- `POST /api/user/login`: Login, sets `token` cookie (JWT).
- `GET /api/user/fetch`: Protected, returns current user details.
- `GET /api/user/logout`: Logs out, clears cookie and blacklists token.

### Controllers: `controllers/user.controller.ts`
- `createUser`
  - Validates email uniqueness.
  - Requires an image file (via Multer), uploads to Cloudinary.
  - Generates a unique `userId` like `ST28####`.
  - Generates `collegeEmail` from name + userId.
  - Saves user; auto-hashes password (via Mongoose pre-save hook).
  - Sends welcome email with credentials.
- `loginUser`
  - Finds user by `userId`, compares password with bcrypt.
  - Generates JWT and sets it in an HTTP-only cookie (`token`).
- `fetchUserDetail`
  - Uses `auth` middleware to read `req.userId` from JWT.
  - Returns profile info (name, image, course, branch, DOB formatted, etc).
- `logoutUser`
  - Reads token from cookie or `Authorization` header.
  - Adds it to a blacklist collection and clears cookie.

### Middleware
- `middlewares/auth.ts`: Verifies JWT from cookie/Authorization header, sets `req.userId` or returns 401.
- `middlewares/multer.ts`: Configures Multer for disk storage; used for handling image upload field `image`.

### Models
- `models/user.model.ts`
  - Fields: name, email, password, DOB, image, fees (default 0), userId, branch, phone, currentSem (default 1), course, collegeEmail.
  - Pre-save hook: hashes password with bcrypt.
- `models/blacklistToken.ts`
  - Stores `token` with an expiry (TTL index ~ 24 hours). Used to invalidate tokens after logout.

### Config
- `config/mongodb.config.ts`: Connects to MongoDB at `MONGO_URL`, database `users`.
- `config/cloudinary.ts`: Initializes Cloudinary using env variables.
- `config/nodemailer.ts`: Creates a Nodemailer transporter using Gmail.
  - Note: `host` string currently says `stmp.gmail.com`; usually it should be `smtp.gmail.com`. Since `service: "gmail"` is set, it will still work, but you can correct the host.

### Utils
- `utils/jwt.ts`: `genrateToken(_id)` → signs a JWT for 1 hour.
- `utils/utils.ts`:
  - `UserIdGenerator()` → Returns IDs like `ST28####`.
  - `formatDOB(dob)` → Returns `dd/mm/yyyy` string.
  - `genrateCollegeEmail({ name, userId })` → e.g. `RAHU8XXXX@gehu.ac`.
- `utils/emailMsg.ts`: HTML email template used in welcome mail.

---

## Frontend Overview (folder: `Frontend/src`)

### App startup
- `main.tsx` mounts the app with React Router.
- `utils/router.tsx` defines routes with lazy loading and a loader page.
- `App.tsx` fetches the logged-in user details on mount from `/api/user/fetch` using `withCredentials: true`. If unauthorized, navigates to `/sign-in`.

### Key Pages
- `pages/SignIn.tsx`
  - Shows `AuthForm` for login and `SideBarLogin` for intro panel.
  - If cookie `token` already exists, navigates to home.
- `pages/Register.tsx`
  - Shows `RegitserForm` for user registration.

### Forms
- `components/AuthForm.tsx`
  - Login with `userId` and `password` using React Hook Form + Zod validation.
  - Sends POST to `/api/user/login` with `withCredentials: true` so cookie is stored.
- `components/RegitserForm.tsx`
  - Registration form with client-side validation, image preview, and FormData upload.
  - On success, shows toast and redirects to Sign In.

### UI/Other
- `components/SideBarLogin.tsx` shows a sidebar with branding and a brief project description.
- `context/user.tsx` has a simple context for token (not strictly required because cookie-based auth is used).

---

## Deep dive: `Frontend/src/components/SideBarLogin.tsx` (in plain language)

Purpose: Yeh component login page ke left side ek info panel dikhata hai (sirf large screens par). Branding/logo aur short intro text dikhata hai.

What it renders:
- An `<aside>` that is 50% width on large screens (`lg:flex`) and hidden on small screens (`hidden`).
- A semi-transparent dark background with blur for a glass effect.
- Inside, a logo image `/assets/image/logo2.webp` and the title “Student Portal”.
- A separator line.
- A short paragraph explaining the ERP portal.

Why it exists:
- To make the login page look professional and informative.
- Chhote screens par hide rehta hai, taa ki form ke liye zyada space mile.

If you want to change text or logo:
- Edit the text inside the `<p>` tag.
- Replace `/assets/image/logo2.webp` with your own logo path if needed.

---

## API Summary (quick reference)

Base URL: `http://localhost:3000`

- POST `/api/user/create` (multipart/form-data)
  - Fields: name, email, password, DOB (ISO string), image (file), phone, course, branch
- POST `/api/user/login` (JSON)
  - Body: { userId, password }
  - Sets cookie: `token` (HTTP-only)
- GET `/api/user/fetch` (Protected)
  - Requires cookie `token`
  - Returns profile details
- GET `/api/user/logout`
  - Clears cookie and blacklists token

---

## Important settings and gotchas
- CORS: Only `http://localhost:5173` is allowed by default. Change in `server.ts` if needed.
- Cookies: `httpOnly`, `sameSite: 'lax'`, `secure: false` (okay for local dev; set `secure: true` in production with HTTPS).
- Token expiry: 1 hour. Logout blacklists token for ~24 hours (TTL index). Adjust in `blacklistToken` model.
- Email sending: Make sure Gmail App Password is configured; normal passwords won’t work.
- Cloudinary: Ensure all 3 keys are present.
- Types: In `user.model.ts` schema, `phone` is stored as String. Keep frontend consistent (it already validates as 10-digit string).

---

## Production notes (high level)
- Use environment-specific CORS and cookie settings.
- Set `secure: true` and `sameSite: 'none'` for cross-site cookies over HTTPS.
- Fix mail `host` to `smtp.gmail.com` or rely only on `service: 'gmail'`.
- Store secrets safely (never commit `.env`).

---

## Where to change what?
- Backend ports or CORS: `Backend/src/server.ts`
- MongoDB URL/DB name: `Backend/src/config/mongodb.config.ts`
- Email template: `Backend/src/utils/emailMsg.ts`
- User fields: `Backend/src/models/user.model.ts`
- Login/Register UI: `Frontend/src/components/AuthForm.tsx`, `Frontend/src/components/RegitserForm.tsx`
- Sidebar copy: `Frontend/src/components/SideBarLogin.tsx`

Bas itna! If you get stuck, start by checking the server logs and network tab in the browser. Happy hacking.


