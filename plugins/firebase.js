import firebase from 'firebase/app'
import 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/auth'

const config = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGEBUCKET,
  apiKey: process.env.FIREBASE_APIKEY,
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

export default firebase