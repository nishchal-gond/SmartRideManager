class GroupMessage {
  final String msgId;
  final String groupId;
  final String userId;
  final String? text;
  final String? audioUrl;
  final DateTime timestamp;

  GroupMessage({
    required this.msgId,
    required this.groupId,
    required this.userId,
    this.text,
    this.audioUrl,
    required this.timestamp,
  });

  Map<String, dynamic> toMap() => {
        'msgId': msgId,
        'groupId': groupId,
        'userId': userId,
        'text': text,
        'audioUrl': audioUrl,
        'timestamp': timestamp.toIso8601String(),
      };

  factory GroupMessage.fromMap(Map<String, dynamic> m) => GroupMessage(
        msgId: m['msgId'] as String,
        groupId: m['groupId'] as String,
        userId: m['userId'] as String,
        text: m['text'] as String?,
        audioUrl: m['audioUrl'] as String?,
        timestamp: DateTime.parse(m['timestamp'] as String),
      );
}
