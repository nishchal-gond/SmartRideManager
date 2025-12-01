import 'dart:convert';
import 'package:http/http.dart' as http;

abstract class ChatbotService {
  Future<String> respond(String prompt, {Map<String, dynamic>? context});
}

class GeminiChatbotService implements ChatbotService {
  final String apiKey;
  GeminiChatbotService(this.apiKey);

  @override
  Future<String> respond(String prompt, {Map<String, dynamic>? context}) async {
    final uri = Uri.parse('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=$apiKey');
    final body = {
      'contents': [
        {
          'parts': [
            {'text': prompt}
          ]
        }
      ]
    };
    final res = await http.post(uri, headers: {'Content-Type': 'application/json'}, body: jsonEncode(body));
    if (res.statusCode == 200) {
      final data = jsonDecode(res.body) as Map<String, dynamic>;
      final c = data['candidates'] as List<dynamic>?;
      final t = ((c?[0]['content']['parts'] as List<dynamic>?)?.first?['text']) as String?;
      return t ?? '';
    }
    return '';
  }
}

class OpenAIChatbotService implements ChatbotService {
  final String apiKey;
  OpenAIChatbotService(this.apiKey);

  @override
  Future<String> respond(String prompt, {Map<String, dynamic>? context}) async {
    final uri = Uri.parse('https://api.openai.com/v1/chat/completions');
    final body = {
      'model': 'gpt-4o-mini',
      'messages': [
        {'role': 'user', 'content': prompt}
      ]
    };
    final res = await http.post(
      uri,
      headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer $apiKey'},
      body: jsonEncode(body),
    );
    if (res.statusCode == 200) {
      final data = jsonDecode(res.body) as Map<String, dynamic>;
      final choices = data['choices'] as List<dynamic>?;
      final msg = choices?[0]['message']['content'] as String?;
      return msg ?? '';
    }
    return '';
  }
}
