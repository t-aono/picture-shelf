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
  init: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('categories', categoriesRef.orderBy('name', 'asc'));
  }),
  create: firestoreAction((context, input) => {
    // DB に保存
    categoriesRef.add({
      name: input.name
    });
  }),
  remove: firestoreAction((context, id) => {
    categoriesRef.doc(id).delete();
  }),
}