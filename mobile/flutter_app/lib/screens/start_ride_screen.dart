import 'package:flutter/material.dart';

class StartRideScreen extends StatelessWidget {
  static const route = '/start-ride';
  const StartRideScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      appBar: AppBar(title: Text('Ride Tracking')),
      body: Center(child: Text('Ride tracking placeholder')),
    );
  }
}
