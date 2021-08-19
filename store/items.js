import firebase from '~/plugins/firebase'
import { firestoreAction } from 'vuexfire'

const db = firebase.firestore()
const itemsRef = db.collection('items')
const storageRef = firebase.storage().ref()

export const state = () => ({
  items: [],
})

export const getters = {
  dbItems(state) {
    return state.items;
  },
  filterCategory: ((state, { category }) => {
console.log(category);return;
    return state.items.filter(item => item.category == category);
  }),
}
/*
export const mutations = {
  filterCategory: ((state, category) => {
    state.items = state.items.filter(item => item.category == category);
  }),
}
*/
export const actions = {
  init: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('items', itemsRef.orderBy('created', 'desc'));
  }),
  create: firestoreAction((context, input) => {
    // Storage にアップロード
    const fileUrl = `pictures/${input.file.name}.${input.file.type}`;
    const picturesRef = storageRef.child(fileUrl);
    picturesRef.putString(input.file.dataUrl, 'data_url').then(() => {
      // DB に保存
      itemsRef.add({
        title: input.title,
        memo: input.memo,
        fileUrl: fileUrl,
        category: input.category,
        created: firebase.firestore.FieldValue.serverTimestamp()
      }).then(() => {
        $nuxt.$router.push('/');
      });
    });
  }),
  update: firestoreAction((context, data) => {
    // DB 更新
    itemsRef.doc(data.id).update({
      title: data.title,
      memo: data.memo
    }).then(() => {
      $nuxt.$router.push('/');
    });
  }),
  remove: firestoreAction((context, data) => {
    // Storage ファイル削除
    const picturesRef = storageRef.child(data.fileUrl);
    picturesRef.delete().then(() => {
      // DB データ削除
      itemsRef.doc(data.id).delete().then(() => {
        $nuxt.$router.push('/');
      });
    });
  }),
  /*
  filterCategory: firestoreAction(({ commit }, category) => {
    commit('filterCategory', category);
  }),
  */
}