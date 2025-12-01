import 'package:flutter/material.dart';
import 'theme.dart';
import 'screens/splash_screen.dart';
import 'screens/login_screen.dart';
import 'screens/add_bike_screen.dart';
import 'screens/dashboard_screen.dart';
import 'screens/start_ride_screen.dart';
import 'screens/group_ride_map_screen.dart';
import 'screens/music_sync_screen.dart';
import 'screens/chat_screen.dart';
import 'screens/settings_screen.dart';

void main() {
  runApp(const RideSyncApp());
}

class RideSyncApp extends StatelessWidget {
  const RideSyncApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'RideSync',
      theme: midnightTechTheme(),
      initialRoute: SplashScreen.route,
      routes: {
        SplashScreen.route: (_) => const SplashScreen(),
        LoginScreen.route: (_) => const LoginScreen(),
        AddBikeScreen.route: (_) => const AddBikeScreen(),
        DashboardScreen.route: (_) => const DashboardScreen(),
        StartRideScreen.route: (_) => const StartRideScreen(),
        GroupRideMapScreen.route: (_) => const GroupRideMapScreen(),
        MusicSyncScreen.route: (_) => const MusicSyncScreen(),
        ChatScreen.route: (_) => const ChatScreen(),
        SettingsScreen.route: (_) => const SettingsScreen(),
      },
    );
  }
}
