import * as Functions from 'firebase-functions'
import * as Admin from 'firebase-admin'
Admin.initializeApp(Functions.config().firebase)

exports.addMessage = Functions.https.onRequest(async (req, res) => {
  const original = req.query.text
  const snapshot = await Admin.database().ref('/messages').push({ original: original })
  res.redirect(303, snapshot.ref)
})
