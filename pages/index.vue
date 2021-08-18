<template>
  <section class="px-3 mt-3">
    <div class="columns is-desktop is-multiline">
      <div class="column is-one-third-desktop my-2 px-3" v-for="item in items" :key="item.id">
        <div class="card" @click="$router.push({path: 'detail', query: { title:item.title, memo: item.memo, imageUrl:setImageUrl(item.fileUrl) }})">
          <header class="card-header">
            <p class="card-header-title has-text-grey">
              {{ item.title }}
            </p>
          </header>
          <div class="card-content">
            <img :src="setImageUrl(item.fileUrl)">
          </div>
          <footer class="card-footer">
            <div class="card-footer-item">
              <span>{{ item.memo }}</span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import firebase from '~/plugins/firebase'

export default {
  data() {
    return {
      items: [],
      images: [],
    }
  },
  async created() {
    // 投稿の取得
    this.$store.dispatch("items/init");
    this.items = this.$store.getters['items/dbItems']
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
    }
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
</style>