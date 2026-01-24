# Running the SmartRideManager Project

This guide shows you how to run the project step by step.

## Prerequisites Check

First, verify you have Node.js installed:
```bash
node --version  # Should be v18 or higher
npm --version   # Should be v9 or higher
```

## Step 1: Navigate to Project Directory

```bash
cd "C:\Users\USER\Desktop\SmartRideManager"
```

**Note:** If you encounter path issues due to special characters, try:
- Using the full path in quotes
- Or navigate to Desktop first: `cd Desktop` then `cd SmartRideManager`

## Step 2: Install Dependencies

If `node_modules` doesn't exist or you want to reinstall:

```bash
npm install
```

This will install all required packages including:
- React 19
- Vite
- Firebase SDK
- React Router
- Tailwind CSS
- Lucide React icons
- And all other dependencies

**Expected output:**
```
added 234 packages, and audited 235 packages in 15s
```

## Step 3: Configure Environment Variables

Create a `.env` file in the root directory with your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_DATABASE_URL=https://your_project-default-rtdb.firebaseio.com
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

**For testing/demo purposes**, you can use placeholder values to see the UI:
```env
VITE_FIREBASE_API_KEY=demo_key
VITE_FIREBASE_AUTH_DOMAIN=demo.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=demo_project
VITE_FIREBASE_STORAGE_BUCKET=demo.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
VITE_FIREBASE_DATABASE_URL=https://demo-default-rtdb.firebaseio.com
VITE_GOOGLE_MAPS_API_KEY=demo_maps_key
```

**Note:** With placeholder values, authentication and database features won't work, but you can see the UI.

## Step 4: Start the Development Server

```bash
npm run dev
```

**Expected output:**
```
  VITE v7.2.5  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

## Step 5: Open in Browser

Open your browser and navigate to:
```
http://localhost:5173
```

You should see:
1. **Login Page** - If not authenticated
2. **Dashboard** - After logging in

## What You'll See

### Without Firebase Configuration (Placeholder values)
- ✅ UI loads and displays correctly
- ✅ Navigation works
- ✅ Pages are accessible
- ❌ Authentication won't work
- ❌ Database operations will fail
- ❌ Real-time features won't work

### With Real Firebase Configuration
- ✅ Full functionality
- ✅ User authentication
- ✅ Create and view rides
- ✅ Group rides
- ✅ Real-time chat
- ✅ All features work

## Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Troubleshooting

### Port Already in Use
If port 5173 is already in use:
```bash
# Vite will automatically try the next available port
# Or specify a different port:
npm run dev -- --port 3000
```

### Module Not Found Errors
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Firebase Errors
- Verify your `.env` file has correct values
- Check Firebase project settings
- Ensure Firebase services are enabled (Auth, Firestore, etc.)

### Build Errors
```bash
# Clear cache and rebuild
npm run build -- --force
```

## Development Tips

1. **Hot Module Replacement (HMR)**: Changes to files automatically refresh the browser
2. **Console Logs**: Check browser console (F12) for any errors
3. **Network Tab**: Use browser DevTools to see API calls
4. **React DevTools**: Install React DevTools extension for debugging

## Next Steps After Running

1. **Set up Firebase**: Follow `docs/SETUP.md` for complete Firebase configuration
2. **Test Features**: 
   - Sign up for an account
   - Create a ride
   - Join/create a group
   - Try the chat feature
3. **Explore Code**: Check `src/` directory for components and pages

## Stopping the Server

Press `Ctrl + C` in the terminal to stop the development server.
