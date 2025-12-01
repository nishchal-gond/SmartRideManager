import 'package:flutter/material.dart';

class SettingsScreen extends StatelessWidget {
  static const route = '/settings';
  const SettingsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      appBar: AppBar(title: Text('Settings')),
      body: Center(child: Text('Settings placeholder')),
    );
  }
}
