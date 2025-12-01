class MusicSyncState {
  final String trackId;
  final int positionMs;
  final bool playing;
  final String leaderId;
  MusicSyncState({required this.trackId, required this.positionMs, required this.playing, required this.leaderId});
}

class MusicSyncManager {
  int estimateDriftMs({required int leaderPositionMs, required int clientPositionMs}) {
    return clientPositionMs - leaderPositionMs;
  }

  int correctedPositionMs({required int leaderPositionMs, required int driftMs}) {
    return leaderPositionMs + driftMs;
  }
}
