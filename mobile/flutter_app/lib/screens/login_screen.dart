import 'package:flutter/material.dart';

class LoginScreen extends StatelessWidget {
  static const route = '/login';
  const LoginScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Login')),
      body: Center(
        child: ElevatedButton(
          onPressed: () => Navigator.of(context).pushReplacementNamed('/dashboard'),
          child: const Text('Continue'),
        ),
      ),
    );
  }
}
