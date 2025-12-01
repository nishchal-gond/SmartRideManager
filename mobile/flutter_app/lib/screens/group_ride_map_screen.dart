import 'package:flutter/material.dart';

class GroupRideMapScreen extends StatelessWidget {
  static const route = '/group-ride';
  const GroupRideMapScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      appBar: AppBar(title: Text('Group Ride')),
      body: Center(child: Text('Group map placeholder')),
    );
  }
}
