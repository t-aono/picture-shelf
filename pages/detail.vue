<template>
  <section class="px-5 mt-3">
    <h2 class="title is-3 has-text-grey">編集</h2>
    <b-field label="タイトル">
      <b-input v-model="title" required></b-input>
    </b-field>
    <b-field label="メモ">
      <b-input rows="2" maxlength="100" type="textarea" v-model="memo"></b-input>
    </b-field>
    <div class="mb-5">
      <img :src="imageUrl">
    </div>
    <b-field label="カテゴリー"></b-field>
    <div class="select">
      <select v-model="category">
        <option v-for="category in categories" :key="category.id">
          {{ category.name }}
        </option>
      </select>
    </div>
    <div class="mt-5">
      <b-button type="is-primary" outlined @click="update()">更新</b-button>
      <b-button type="is-primary" outlined @click="remove()" class="ml-5">削除</b-button>
    </div>
  </section>
</template>

<script>
import firebase from "~/plugins/firebase";

export default {
  props: ['item'],
  data() {
    return {
      title: "",
      memo: "",
      imageUrl: "",
      id: "",
      fileUrl: "",
      category: "",
      categories: [],
    };
  },
  created() {
    // 認証
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) this.$router.push('/login');
      // カテゴリーの取得
      this.$store.dispatch("categories/init", user.uid);
      this.categories = this.$store.getters["categories/dbCategories"];
    });
    // 投稿内容をセット
    this.title = this.$route.query.title;
    this.memo = this.$route.query.memo;
    this.imageUrl = this.$route.query.imageUrl;
    this.id = this.$route.query.id;
    this.fileUrl = this.$route.query.fileUrl;
    this.category = this.$route.query.category;
  },
  methods: {
    update() {
      this.$store.dispatch("items/update", {
        title: this.title,
        memo: this.memo,
        category: this.category,
        id: this.id
      });
    },
    remove() {
      if (confirm('削除しますか？')) {
        this.$store.dispatch("items/remove", { id: this.id, fileUrl: this.fileUrl });
      }
    }
  },
};
</script>
