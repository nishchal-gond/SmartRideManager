class ReminderSchedulerResult {
  final DateTime? nextInsurance;
  final DateTime? nextPuc;
  final double? nextBrakeServiceKm;
  ReminderSchedulerResult({this.nextInsurance, this.nextPuc, this.nextBrakeServiceKm});
}

class ReminderScheduler {
  ReminderSchedulerResult compute({
    DateTime? insuranceExpiry,
    DateTime? pucExpiry,
    double? brakeServiceEveryKm,
    double currentOdometerKm = 0,
  }) {
    DateTime? nextInsurance = insuranceExpiry;
    DateTime? nextPuc = pucExpiry;
    double? nextBrakeKm = brakeServiceEveryKm != null ? currentOdometerKm + brakeServiceEveryKm : null;
    return ReminderSchedulerResult(nextInsurance: nextInsurance, nextPuc: nextPuc, nextBrakeServiceKm: nextBrakeKm);
  }
}
