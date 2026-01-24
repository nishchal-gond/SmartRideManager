const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();
const database = admin.database();

/**
 * Music Sync Handler
 * Synchronizes music playback across all participants in a group ride
 */
exports.onMusicUpdate = functions.database
  .ref('/musicSession/{sessionId}')
  .onWrite(async (change, context) => {
    const { sessionId } = context.params;
    const after = change.after.val();
    
    if (!after) {
      console.log(`Music session ${sessionId} deleted`);
      return null;
    }

    try {
      const { leaderId, trackId, positionMs, playing } = after;
      
      if (!leaderId) {
        console.error('No leaderId provided for music session');
        return null;
      }

      // Update session with validated data
      await change.after.ref.update({
        trackId: trackId || null,
        positionMs: positionMs || 0,
        playing: playing || false,
        leaderId,
        lastUpdated: admin.database.ServerValue.TIMESTAMP,
      });

      console.log(`Music session ${sessionId} updated by leader ${leaderId}`);
      return null;
    } catch (error) {
      console.error(`Error updating music session ${sessionId}:`, error);
      throw error;
    }
  });

/**
 * Matchmaking Function
 * Helps users find group rides based on preferences
 */
exports.matchmaking = functions.https.onCall(async (data, context) => {
  // Verify authentication
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'User must be authenticated to use matchmaking'
    );
  }

  try {
    const { location, radius, rideType, timePreference } = data;
    const userId = context.auth.uid;

    // Validate input
    if (!location || !location.latitude || !location.longitude) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'Location with latitude and longitude is required'
      );
    }

    // Query for nearby groups
    const groupsRef = db.collection('groups');
    const snapshot = await groupsRef
      .where('status', '==', 'active')
      .where('rideType', '==', rideType || 'any')
      .get();

    const matches = [];
    snapshot.forEach((doc) => {
      const group = doc.data();
      // Calculate distance (simplified - in production, use geohash or similar)
      if (group.location) {
        const distance = calculateDistance(
          location.latitude,
          location.longitude,
          group.location.latitude,
          group.location.longitude
        );
        
        if (distance <= (radius || 50)) { // Default 50km radius
          matches.push({
            groupId: doc.id,
            name: group.name,
            distance: Math.round(distance),
            memberCount: group.members?.length || 0,
            ...group,
          });
        }
      }
    });

    // Sort by distance
    matches.sort((a, b) => a.distance - b.distance);

    return {
      success: true,
      matches: matches.slice(0, 10), // Return top 10 matches
      count: matches.length,
    };
  } catch (error) {
    console.error('Matchmaking error:', error);
    throw new functions.https.HttpsError(
      'internal',
      'An error occurred during matchmaking',
      error.message
    );
  }
});

/**
 * Maintenance Reminder Notifier
 * Sends notifications for upcoming maintenance due dates
 */
exports.notifyExpiry = functions.pubsub
  .schedule('every 24 hours')
  .timeZone('UTC')
  .onRun(async (context) => {
    try {
      const now = admin.firestore.Timestamp.now();
      const sevenDaysFromNow = admin.firestore.Timestamp.fromMillis(
        now.toMillis() + 7 * 24 * 60 * 60 * 1000
      );

      // Query bikes with maintenance due in the next 7 days
      const bikesRef = db.collection('bikes');
      const snapshot = await bikesRef
        .where('nextMaintenanceDate', '<=', sevenDaysFromNow)
        .where('nextMaintenanceDate', '>=', now)
        .get();

      const notifications = [];
      snapshot.forEach(async (doc) => {
        const bike = doc.data();
        const userId = bike.userId;

        if (userId) {
          // Create notification document
          await db.collection('notifications').add({
            userId,
            bikeId: doc.id,
            type: 'maintenance_reminder',
            title: 'Maintenance Reminder',
            message: `Your bike "${bike.name || 'Bike'}" needs maintenance soon`,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            read: false,
          });

          notifications.push({
            userId,
            bikeId: doc.id,
            bikeName: bike.name,
          });
        }
      });

      console.log(`Sent ${notifications.length} maintenance reminders`);
      return null;
    } catch (error) {
      console.error('Error sending maintenance reminders:', error);
      throw error;
    }
  });

/**
 * Helper function to calculate distance between two coordinates (Haversine formula)
 */
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees) {
  return degrees * (Math.PI / 180);
}

/**
 * Cleanup old ride data
 * Removes rides older than 1 year
 */
exports.cleanupOldRides = functions.pubsub
  .schedule('every 7 days')
  .timeZone('UTC')
  .onRun(async (context) => {
    try {
      const oneYearAgo = admin.firestore.Timestamp.fromMillis(
        Date.now() - 365 * 24 * 60 * 60 * 1000
      );

      const ridesRef = db.collection('rides');
      const snapshot = await ridesRef
        .where('createdAt', '<', oneYearAgo)
        .limit(500)
        .get();

      const batch = db.batch();
      let count = 0;

      snapshot.forEach((doc) => {
        batch.delete(doc.ref);
        count++;
      });

      if (count > 0) {
        await batch.commit();
        console.log(`Deleted ${count} old rides`);
      }

      return null;
    } catch (error) {
      console.error('Error cleaning up old rides:', error);
      throw error;
    }
  });
