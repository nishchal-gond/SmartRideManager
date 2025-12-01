import 'package:flutter/material.dart';

class MusicSyncScreen extends StatelessWidget {
  static const route = '/music-sync';
  const MusicSyncScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      appBar: AppBar(title: Text('Music Sync')),
      body: Center(child: Text('Music sync placeholder')),
    );
  }
}
