# Setup Guide

This guide will help you set up the SmartRideManager project from scratch.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **Flutter** 3.24+ ([Download](https://flutter.dev/docs/get-started/install))
- **Firebase CLI** ([Install Guide](https://firebase.google.com/docs/cli))
- **Git** ([Download](https://git-scm.com/))

## Step 1: Clone the Repository

```bash
git clone <repository-url>
cd SmartRideManager
```

## Step 2: Firebase Setup

### 2.1 Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name: `smartridemanager` (or your preferred name)
4. Follow the setup wizard
5. Enable Google Analytics (optional)

### 2.2 Enable Firebase Services

In your Firebase project, enable the following services:

#### Authentication
1. Go to **Authentication** > **Sign-in method**
2. Enable **Email/Password**
3. Enable **Google** (optional but recommended)

#### Firestore Database
1. Go to **Firestore Database**
2. Click **Create database**
3. Start in **production mode** (we'll use security rules)
4. Choose a location close to your users

#### Realtime Database
1. Go to **Realtime Database**
2. Click **Create database**
3. Choose a location
4. Start in **locked mode** (we'll use security rules)

#### Storage
1. Go to **Storage**
2. Click **Get started**
3. Start in **production mode**
4. Choose a location

#### Cloud Functions
1. Go to **Functions**
2. Click **Get started** (if not already enabled)
3. Upgrade to Blaze plan (required for Cloud Functions)

### 2.3 Configure Firebase for Web

1. Go to **Project Settings** > **General**
2. Scroll to **Your apps** section
3. Click **Web** icon (`</>`)
4. Register app with nickname: `SmartRideManager Web`
5. Copy the Firebase configuration object

### 2.4 Configure Firebase for Mobile

#### Android
1. In Firebase Console, click **Android** icon
2. Register app with package name (e.g., `com.ridesync.app`)
3. Download `google-services.json`
4. Place it in `mobile/flutter_app/android/app/`

#### iOS
1. In Firebase Console, click **iOS** icon
2. Register app with bundle ID (e.g., `com.ridesync.app`)
3. Download `GoogleService-Info.plist`
4. Place it in `mobile/flutter_app/ios/Runner/`

### 2.5 Deploy Security Rules

```bash
cd backend/firebase
firebase login
firebase use --add  # Select your project
firebase deploy --only firestore:rules,database:rules,storage:rules
```

### 2.6 Deploy Cloud Functions

```bash
cd backend/firebase/functions
npm install
cd ..
firebase deploy --only functions
```

## Step 3: Web App Setup

### 3.1 Install Dependencies

```bash
npm install
```

### 3.2 Configure Environment Variables

1. Create a `.env` file in the root directory:

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

2. Replace the values with your Firebase configuration from Step 2.3

### 3.3 Get Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable **Maps JavaScript API**
4. Go to **Credentials** > **Create Credentials** > **API Key**
5. Copy the API key to your `.env` file

### 3.4 Run Development Server

```bash
npm run dev
```

The app should now be running at `http://localhost:5173`

## Step 4: Mobile App Setup

### 4.1 Install Flutter Dependencies

```bash
cd mobile/flutter_app
flutter pub get
```

### 4.2 Configure Google Maps (Android)

1. Open `android/app/src/main/AndroidManifest.xml`
2. Add your Google Maps API key:

```xml
<meta-data
    android:name="com.google.android.geo.API_KEY"
    android:value="YOUR_GOOGLE_MAPS_API_KEY"/>
```

### 4.3 Configure Google Maps (iOS)

1. Open `ios/Runner/Info.plist`
2. Add your Google Maps API key:

```xml
<key>GMSApiKey</key>
<string>YOUR_GOOGLE_MAPS_API_KEY</string>
```

### 4.4 Run on Device/Emulator

```bash
flutter run
```

## Step 5: Verify Installation

### Web App
1. Open `http://localhost:5173`
2. Try signing up with a test account
3. Verify you can create rides and groups

### Mobile App
1. Run the app on your device/emulator
2. Sign in with the same test account
3. Verify data syncs between web and mobile

## Troubleshooting

### Firebase Connection Issues
- Verify your `.env` file has correct values
- Check Firebase project settings
- Ensure Firebase services are enabled

### Build Errors
- Run `npm install` again
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- For Flutter: `flutter clean && flutter pub get`

### Authentication Issues
- Verify Email/Password auth is enabled in Firebase
- Check Firebase security rules
- Verify API keys are correct

### Google Maps Not Loading
- Verify API key is correct
- Check API restrictions in Google Cloud Console
- Ensure Maps JavaScript API is enabled

## Next Steps

- Read [CONTRIBUTING.md](../docs/CONTRIBUTING.md) for development guidelines
- Check [README.md](../README.md) for project overview
- Explore the codebase structure

## Support

If you encounter issues:
1. Check existing GitHub issues
2. Review Firebase documentation
3. Check Flutter documentation
4. Create a new issue with details
