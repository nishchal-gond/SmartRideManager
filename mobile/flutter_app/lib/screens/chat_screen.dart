import 'package:flutter/material.dart';

class ChatScreen extends StatelessWidget {
  static const route = '/chat';
  const ChatScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      appBar: AppBar(title: Text('Chat')),
      body: Center(child: Text('Chat placeholder')),
    );
  }
}
