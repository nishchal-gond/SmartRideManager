class RiderProfile {
  final String uid;
  final String name;
  final String? photoUrl;
  final String? emergencyContact;

  RiderProfile({required this.uid, required this.name, this.photoUrl, this.emergencyContact});

  Map<String, dynamic> toMap() => {
        'uid': uid,
        'name': name,
        'photo': photoUrl,
        'emergencyContact': emergencyContact,
      };

  factory RiderProfile.fromMap(Map<String, dynamic> m) => RiderProfile(
        uid: m['uid'] as String,
        name: m['name'] as String,
        photoUrl: m['photo'] as String?,
        emergencyContact: m['emergencyContact'] as String?,
      );
}
