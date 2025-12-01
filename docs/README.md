# RideSync

- Flutter + Firebase cross-platform app for group rides, maintenance reminders, music sync, chat, and chatbot.
- Repository layout: `mobile/flutter_app`, `backend/firebase`, `docs`, `.github/workflows`.
- CI builds Android debug APK and iOS simulator build.

## Setup
- Create Firebase project and enable Auth, Firestore, Realtime DB, Storage.
- Configure Google Maps API keys for Android/iOS.
- Add environment secrets for CI if needed.

## Run
- Install Flutter 3.24+.
- `cd mobile/flutter_app`
- `flutter pub get`
- `flutter run`
