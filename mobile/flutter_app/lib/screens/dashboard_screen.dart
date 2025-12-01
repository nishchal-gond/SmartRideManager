import 'package:flutter/material.dart';

class DashboardScreen extends StatelessWidget {
  static const route = '/dashboard';
  const DashboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Dashboard')),
      body: ListView(
        children: [
          ListTile(title: const Text('Start Ride'), onTap: () => Navigator.pushNamed(context, '/start-ride')),
          ListTile(title: const Text('Group Ride'), onTap: () => Navigator.pushNamed(context, '/group-ride')),
          ListTile(title: const Text('Music Sync'), onTap: () => Navigator.pushNamed(context, '/music-sync')),
          ListTile(title: const Text('Chat'), onTap: () => Navigator.pushNamed(context, '/chat')),
          ListTile(title: const Text('Settings'), onTap: () => Navigator.pushNamed(context, '/settings')),
        ],
      ),
    );
  }
}
