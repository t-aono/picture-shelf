<template>
  <section class="section">
    <div class="columns is-mobile">
      <div class="card" v-for="item in items" :key="item.id">
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
  </section>
</template>

<script>
// import Card from '~/components/Card'
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
  // components: {
  //   Card
  // }
};
</script>
