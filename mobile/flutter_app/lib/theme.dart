import 'package:flutter/material.dart';

const Color bg = Color(0xFF0B0F14);
const Color card = Color(0xFF121A22);
const Color accent = Color(0xFF00F0FF);
const Color text = Color(0xFFEAF6FF);
const Color warning = Color(0xFFFFB020);
const Color danger = Color(0xFFFF2E2E);

ThemeData midnightTechTheme() {
  return ThemeData(
    brightness: Brightness.dark,
    scaffoldBackgroundColor: bg,
    colorScheme: const ColorScheme.dark(
      primary: accent,
      secondary: accent,
      surface: card,
      background: bg,
      error: danger,
      onPrimary: bg,
      onSecondary: bg,
      onSurface: text,
      onBackground: text,
      onError: bg,
    ),
    textTheme: const TextTheme(
      bodyLarge: TextStyle(color: text),
      bodyMedium: TextStyle(color: text),
      titleLarge: TextStyle(color: text),
    ),
    appBarTheme: const AppBarTheme(backgroundColor: card, foregroundColor: text),
    cardColor: card,
    floatingActionButtonTheme: const FloatingActionButtonThemeData(backgroundColor: accent, foregroundColor: bg),
  );
}
