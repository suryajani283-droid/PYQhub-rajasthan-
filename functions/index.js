const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.checkAccess = functions.https.onCall(async (data, context) => {
  // यह कॉल क्लाइंट से नहीं, Worker से होगी – इसलिए हम auth context का इस्तेमाल नहीं कर सकते।
  // हम अपना खुद का API key या कोई सीक्रेट इस्तेमाल करेंगे ताकि सिर्फ Worker ही इस फंक्शन को कॉल कर सके।
  const workerSecret = 'my-super-secret-key'; // इसे Cloudflare Worker के Environment variables में सेट करें
  const providedSecret = data.secret;
  if (providedSecret !== workerSecret) {
    throw new functions.https.HttpsError('permission-denied', 'Invalid caller');
  }

  const { uid, paperId, bundleId } = data;
  let downloadURL = null;

  if (paperId) {
    const paperDoc = await admin.firestore().collection('papers').doc(paperId).get();
    if (!paperDoc.exists) throw new functions.https.HttpsError('not-found', 'Paper not found');
    const paper = paperDoc.data();
    if (!paper.isFree) {
      const purchaseSnap = await admin.firestore().collection('purchases')
        .where('userId', '==', uid)
        .where('paperId', '==', paperId)
        .get();
      if (purchaseSnap.empty) throw new functions.https.HttpsError('permission-denied', 'Not purchased');
    }
    downloadURL = paper.downloadURL; // Google Drive का डायरेक्ट लिंक
  } else if (bundleId) {
    const bundleDoc = await admin.firestore().collection('bundles').doc(bundleId).get();
    if (!bundleDoc.exists) throw new functions.https.HttpsError('not-found', 'Bundle not found');
    downloadURL = bundleDoc.data().downloadURL;
  }

  if (!downloadURL) throw new functions.https.HttpsError('not-found', 'No file');

  return { downloadURL };
});