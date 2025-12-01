import 'package:flutter_test/flutter_test.dart';
import 'package:ridesync/services/music_sync_manager.dart';

void main() {
  test('drift estimation within tolerance', () {
    final m = MusicSyncManager();
    final drift = m.estimateDriftMs(leaderPositionMs: 10000, clientPositionMs: 11250);
    expect(drift, 1250);
    final corrected = m.correctedPositionMs(leaderPositionMs: 10000, driftMs: drift);
    expect(corrected, 11250);
  });
}
