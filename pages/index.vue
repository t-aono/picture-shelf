<template>
  <section class="px-3 mt-3">
    <h2 class="title is-3 has-text-grey">投稿一覧</h2>
    <div v-show="category">
      <h3 class="mb-1 is-size-4 has-text-grey">カテゴリー：{{ category }}</h3>
      <div class="has-text-centered">
          <button class="button is-small is-rounded" @click="clearCategory()">全カテゴリー</button>
      </div>
    </div>
    <div class="columns is-desktop is-multiline" v-if="items.length > 0">
      <div class="column is-one-third-desktop my-2 px-3" v-for="item in items" :key="item.id">
        <div class="m-2">
          <button class="button is-small is-rounded" @click="selectCategory(item.category)">{{ item.category }}</button>
        </div>
        <div class="card" 
          @click="$router.push({path: 'detail', query: { id: item.id, title:item.title, memo: item.memo, imageUrl:setImageUrl(item.fileUrl), fileUrl:item.fileUrl, category: item.category }})"
        >
          <header class="card-header">
            <p class="card-header-title has-text-grey">
              {{ item.title }}
            </p>
          </header>
          <div class="card-image">
            <figure class="image is-4by3">
              <img :src="setImageUrl(item.fileUrl)">
            </figure>
          </div>
          <footer class="card-footer">
            <div class="card-footer-item">
              <span>{{ setMemo(item.memo) }}</span>
            </div>
          </footer>
        </div>
      </div>
    </div>
    <div class="ml-5 mt-5 has-text-grey" v-else><p>投稿がありません。</p></div>
  </section>
</template>

<script>
import firebase from '~/plugins/firebase'

export default {
  data() {
    return {
      items: [],
      images: [],
      category: '',
    }
  },
  async created() {
    // 認証
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) this.$router.push('/login');
      // 投稿の取得
      if (user) {
        this.$store.dispatch("items/init", user.uid);
        this.items = this.$store.getters['items/dbItems']
      }
    });
    // 画像
    const storageRef = firebase.storage().ref().child('pictures');
    const list = await storageRef.listAll();
    list.items.forEach(item => {
      item.getDownloadURL().then(url => {
        this.images.push({path: item.fullPath, url: url});
      })
    })
  },
  methods: {
    setImageUrl(url) {
      const index = this.images.findIndex(image => image.path == url)
      if (index >= 0) {
        return this.images[index].url;
      }
    },
    setMemo(str) {
      if (str) return str.slice(0, 34) + '...';
      else return '';
    },
    selectCategory(category) {
      this.category = category;
      this.items = this.$store.getters['items/filterCategory'](category);
    },
    clearCategory() {
      this.category = '';
      this.items = this.$store.getters['items/dbItems'];
    },
  }
};
</script>

<style scoped>
img {
  height: 200px;
  object-fit: contain;
}
.card-content {
  text-align: center;
}
div.card-footer-item {
  height: 72px;
}
</style>