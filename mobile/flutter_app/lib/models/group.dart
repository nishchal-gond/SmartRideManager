class RideGroup {
  final String groupId;
  final String leaderId;
  final String name;
  final bool active;

  RideGroup({required this.groupId, required this.leaderId, required this.name, required this.active});

  Map<String, dynamic> toMap() => {
        'groupId': groupId,
        'leaderId': leaderId,
        'name': name,
        'active': active,
      };

  factory RideGroup.fromMap(Map<String, dynamic> m) => RideGroup(
        groupId: m['groupId'] as String,
        leaderId: m['leaderId'] as String,
        name: m['name'] as String,
        active: m['active'] as bool,
      );
}
