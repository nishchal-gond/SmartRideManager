import 'package:flutter_test/flutter_test.dart';
import 'package:ridesync/services/reminder_scheduler.dart';

void main() {
  test('computes next reminders', () {
    final s = ReminderScheduler();
    final now = DateTime.utc(2025, 1, 1);
    final r = s.compute(insuranceExpiry: now.add(const Duration(days: 30)), pucExpiry: now.add(const Duration(days: 15)), brakeServiceEveryKm: 3000, currentOdometerKm: 12000);
    expect(r.nextInsurance!.difference(now).inDays, 30);
    expect(r.nextPuc!.difference(now).inDays, 15);
    expect(r.nextBrakeServiceKm, 15000);
  });
}
