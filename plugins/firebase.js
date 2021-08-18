import firebase from 'firebase/app'
import 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'

const config = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGEBUCKET,
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

export default firebase