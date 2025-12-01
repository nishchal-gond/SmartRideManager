class BikeProfile {
  final String bikeId;
  final String userId;
  final String model;
  final String regNo;
  final int year;
  final double odometer;
  final DateTime? insuranceExpiry;
  final DateTime? pucExpiry;
  final double? brakeServiceKm;

  BikeProfile({
    required this.bikeId,
    required this.userId,
    required this.model,
    required this.regNo,
    required this.year,
    required this.odometer,
    this.insuranceExpiry,
    this.pucExpiry,
    this.brakeServiceKm,
  });

  Map<String, dynamic> toMap() => {
        'bikeId': bikeId,
        'userId': userId,
        'model': model,
        'regNo': regNo,
        'year': year,
        'odometer': odometer,
        'insuranceExpiry': insuranceExpiry?.toIso8601String(),
        'pucExpiry': pucExpiry?.toIso8601String(),
        'brakeServiceKm': brakeServiceKm,
      };

  factory BikeProfile.fromMap(Map<String, dynamic> m) => BikeProfile(
        bikeId: m['bikeId'] as String,
        userId: m['userId'] as String,
        model: m['model'] as String,
        regNo: m['regNo'] as String,
        year: (m['year'] as num).toInt(),
        odometer: (m['odometer'] as num).toDouble(),
        insuranceExpiry: m['insuranceExpiry'] != null ? DateTime.parse(m['insuranceExpiry'] as String) : null,
        pucExpiry: m['pucExpiry'] != null ? DateTime.parse(m['pucExpiry'] as String) : null,
        brakeServiceKm: (m['brakeServiceKm'] as num?)?.toDouble(),
      );
}
