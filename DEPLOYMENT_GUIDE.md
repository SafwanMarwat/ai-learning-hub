# Deployment Guide: AI Learning Hub

Your website is built with **Vite + React** and uses **Firebase** for the backend (Database & Storage).

## 1. Prerequisites

Ensure your code builds locally without errors (I have already verified this ✅):
```bash
npm run build
```

## 2. Environment Variables

You must configure these variables on your hosting provider (Vercel, Netlify, etc.). Use the values from your local `.env` file.

| Variable | Description |
|----------|-------------|
| `VITE_FIREBASE_API_KEY` | Your Firebase API Key |
| `VITE_FIREBASE_AUTH_DOMAIN` | `project-id.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | Your Project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | `project-id.appspot.com` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Your Sender ID |
| `VITE_FIREBASE_APP_ID` | Your App ID |
| `VITE_FIREBASE_MEASUREMENT_ID` | Your Measurement ID |

## 3. Firebase Security Rules (IMPORTANT)

Since we are using **Local Authentication** (simple password protection) instead of Firebase Auth, your database rules need to be open for the Admin Panel to work.

1.  Go to **Firebase Console** > **Firestore Database** > **Rules**.
2.  Copy/Paste the content of the `firestore.rules` file included in this project.
3.  Go to **Firebase Console** > **Storage** > **Rules**.
4.  Copy/Paste the content of the `storage.rules` file included in this project.

> **⚠️ Security Note:** These rules allow anyone to read/write to your database. This is acceptable for a starting MVP or portfolio project, but if you scale, you should implement full Firebase Authentication.

## 4. Hosting Options

### Option A: Vercel (Recommended)
1.  Push your code to GitHub.
2.  Import project into Vercel.
3.  Vercel will detect `Vite`.
4.  Adding Environment Variables: Go to Project Settings > Environment Variables and paste the key-value pairs from your `.env` file.
5.  Deploy!

### Option B: Netlify
1.  Push to GitHub.
2.  New Site from Git.
3.  Build Command: `npm run build`
4.  Publish Directory: `dist`
5.  Add Environment Variables in Site Settings.
6.  Deploy!

## 5. Post-Deployment Checklist
- [ ] Visit the live URL.
- [ ] Test the **Dark Mode** toggle.
- [ ] Go to `/admin/login` and try logging in.
- [ ] Initial Load: The blog might be empty. Use the Admin Panel to create your first Welcome Post!
