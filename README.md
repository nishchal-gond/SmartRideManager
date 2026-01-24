# SmartRideManager (RideSync)

A comprehensive cross-platform application for managing group rides, bike maintenance, synchronized music, real-time chat, and AI-powered assistance. Built with Flutter for mobile and React for web.

## 🚀 Features

- **Group Rides**: Real-time location tracking and coordination for group cycling
- **Bike Management**: Track your bikes, maintenance schedules, and service history
- **Music Sync**: Synchronized music playback across all riders in a group
- **Real-time Chat**: Communicate with your riding group
- **AI Chatbot**: Get assistance with ride planning, maintenance tips, and more
- **Maintenance Reminders**: Never miss a service appointment with smart notifications
- **Odometer Tracking**: Automatic distance calculation and tracking

## 📁 Project Structure

```
SmartRideManager/
├── mobile/flutter_app/     # Flutter mobile application
├── backend/firebase/        # Firebase backend configuration
│   ├── functions/          # Cloud Functions
│   ├── firestore.rules     # Firestore security rules
│   ├── database.rules.json # Realtime Database rules
│   └── storage.rules       # Storage security rules
├── src/                    # React web application
├── docs/                   # Documentation
└── public/                 # Static assets
```

## 🛠️ Tech Stack

### Mobile App (Flutter)
- Flutter 3.24+
- Firebase (Auth, Firestore, Realtime DB, Storage)
- Google Maps
- Spotify SDK
- WebRTC for real-time communication
- Riverpod for state management

### Web App (React)
- React 19
- Vite
- React Router
- Tailwind CSS
- Firebase SDK

### Backend
- Firebase Cloud Functions
- Firestore Database
- Realtime Database
- Firebase Storage
- Firebase Authentication

## 📋 Prerequisites

- **Flutter**: 3.24 or higher
- **Node.js**: 18 or higher
- **Firebase CLI**: Latest version
- **Google Maps API Key**: For location features
- **Spotify API Credentials**: For music sync (optional)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd SmartRideManager
```

### 2. Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable the following services:
   - Authentication (Email/Password, Google)
   - Firestore Database
   - Realtime Database
   - Storage
   - Cloud Functions

3. Configure Firebase:
   ```bash
   cd backend/firebase
   firebase login
   firebase use --add  # Select your project
   ```

4. Deploy security rules:
   ```bash
   firebase deploy --only firestore:rules,database:rules,storage:rules
   ```

5. Deploy Cloud Functions:
   ```bash
   cd functions
   npm install
   cd ..
   firebase deploy --only functions
   ```

### 3. Mobile App Setup

1. Navigate to the Flutter app:
   ```bash
   cd mobile/flutter_app
   ```

2. Install dependencies:
   ```bash
   flutter pub get
   ```

3. Configure Firebase:
   - Download `google-services.json` (Android) and `GoogleService-Info.plist` (iOS) from Firebase Console
   - Place them in the appropriate platform directories

4. Add Google Maps API key:
   - Android: Add to `android/app/src/main/AndroidManifest.xml`
   - iOS: Add to `ios/Runner/Info.plist`

5. Run the app:
   ```bash
   flutter run
   ```

### 4. Web App Setup

1. Navigate to the web app:
   ```bash
   cd src
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Firebase:
   - Copy `.env.example` to `.env`
   - Add your Firebase configuration

4. Start the development server:
   ```bash
   npm run dev
   ```

## 🔧 Environment Variables

Create a `.env` file in the root directory (see `.env.example` for template):

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_key
```

## 📱 Available Scripts

### Web App
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Mobile App
- `flutter run` - Run on connected device/emulator
- `flutter test` - Run tests
- `flutter build apk` - Build Android APK
- `flutter build ios` - Build iOS app

## 🧪 Testing

### Flutter Tests
```bash
cd mobile/flutter_app
flutter test
```

### Web Tests
```bash
npm test
```

## 📚 Documentation

- [Contributing Guide](docs/CONTRIBUTING.md)
- [API Documentation](docs/README.md)

## 🤝 Contributing

Please read [CONTRIBUTING.md](docs/CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Firebase for backend infrastructure
- Flutter team for the amazing framework
- React team for the web framework
- All contributors and users
