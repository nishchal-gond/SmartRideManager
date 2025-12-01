class RideLog {
  final String rideId;
  final String userId;
  final DateTime startTime;
  final DateTime? endTime;
  final double distance;
  final List<List<double>> route;

  RideLog({
    required this.rideId,
    required this.userId,
    required this.startTime,
    this.endTime,
    required this.distance,
    required this.route,
  });

  Map<String, dynamic> toMap() => {
        'rideId': rideId,
        'userId': userId,
        'startTime': startTime.toIso8601String(),
        'endTime': endTime?.toIso8601String(),
        'distance': distance,
        'route': route,
      };

  factory RideLog.fromMap(Map<String, dynamic> m) => RideLog(
        rideId: m['rideId'] as String,
        userId: m['userId'] as String,
        startTime: DateTime.parse(m['startTime'] as String),
        endTime: m['endTime'] != null ? DateTime.parse(m['endTime'] as String) : null,
        distance: (m['distance'] as num).toDouble(),
        route: (m['route'] as List).map((e) => (e as List).map((x) => (x as num).toDouble()).toList()).toList(),
      );
}
