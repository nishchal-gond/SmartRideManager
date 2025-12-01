import 'package:flutter_test/flutter_test.dart';
import 'package:ridesync/services/odometer_calculator.dart';

void main() {
  test('applies distance to odometer', () {
    final calc = OdometerCalculator();
    final r = calc.applyDistance(12000.5, 123.2);
    expect(r, 12123.7);
  });
}
