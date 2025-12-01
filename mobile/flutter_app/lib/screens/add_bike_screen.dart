import 'package:flutter/material.dart';

class AddBikeScreen extends StatelessWidget {
  static const route = '/add-bike';
  const AddBikeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Add Bike')),
      body: Center(
        child: ElevatedButton(
          onPressed: () => Navigator.of(context).pushReplacementNamed('/dashboard'),
          child: const Text('Save'),
        ),
      ),
    );
  }
}
