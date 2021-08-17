import firebase from '~/plugins/firebase'
import { firestoreAction } from 'vuexfire'

const db = firebase.firestore()
const itemsRef = db.collection('items')

export const state = () => ({
  items: []
})

export const actions = {
  init: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('items', itemsRef)
  }),
  add: firestoreAction((context, value) => {
    itemsRef.add({

      created: firebase.firestore.FieldValue.serverTimestamp()
    })
  })
}