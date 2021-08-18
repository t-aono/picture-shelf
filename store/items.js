import firebase from '~/plugins/firebase'
import { firestoreAction } from 'vuexfire'

const db = firebase.firestore()
const itemsRef = db.collection('items')

export const state = () => ({
  items: []
})

export const getters = {
  dbItems(state) {
    return state.items;
  },
}

export const actions = {
  init: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('items', itemsRef.orderBy('created', 'desc'));
  }),
  create: firestoreAction((context, input) => {
   // Storage にアップロード
   const storageRef = firebase.storage().ref();
   const fileUrl = `pictures/${input.file.name}.${input.file.type}`;
   const picturesRef = storageRef.child(fileUrl);
   picturesRef.putString(input.file.dataUrl, 'data_url').then(() => {
     // Firestore に保存
     itemsRef.add({
       title: input.title,
       memo: input.memo,
       fileUrl: fileUrl,
       created: firebase.firestore.FieldValue.serverTimestamp()
     }).then(() => {
       $nuxt.$router.push('/')
     });
    });
  }),

}