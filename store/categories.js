import firebase from '~/plugins/firebase'
import { firestoreAction } from 'vuexfire'

const db = firebase.firestore()
const categoriesRef = db.collection('categories')

export const state = () => ({
  categories: [],
})

export const getters = {
  dbCategories(state) {
    return state.categories;
  },
}

export const mutations = {
  create(state, input) {
    state.categories.push(input.name);
  }
}

export const actions = {
  init: firestoreAction(({ bindFirestoreRef }, uid) => {
    bindFirestoreRef('categories', categoriesRef.where('uid', '==', uid).orderBy('name', 'asc'));
  }),
  create: firestoreAction((context, input) => {
    // DB に保存
    categoriesRef.add({
      name: input.name,
      uid: firebase.auth().currentUser.uid,
    });
  }),
  remove: firestoreAction((context, id) => {
    categoriesRef.doc(id).delete();
  }),
}