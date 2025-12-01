const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.onMusicUpdate = functions.database.ref('/musicSession/{sessionId}').onWrite(async (change, context) => {
  const after = change.after.val();
  if (!after) return null;
  const leaderId = after.leaderId;
  return change.after.ref.update({ trackId: after.trackId, positionMs: after.positionMs, playing: after.playing, leaderId });
});

exports.matchmaking = functions.https.onCall(async (data, context) => {
  return { ok: true };
});

exports.notifyExpiry = functions.pubsub.schedule('every 24 hours').onRun(async (context) => {
  return null;
});
