<template>
  <section class="px-5 mt-3">
    <h2 class="title is-3 has-text-grey">カテゴリー</h2>
    <div class="field is-grouped">
      <p class="control">
        <input class="input" type="text" placeholder="カテゴリー名称" v-model="name" required />
      </p>
      <p class="control">
        <button class="button is-primary" @click="create()"> 追加 </button>
      </p>
    </div>
    <ul v-if="categories.length > 0">
      <li v-for="category in categories" :key="category.id" class="m-2">
        <a @click="remove(category.id)">
          <b-icon icon="close" size="is-small" class="mr-3"></b-icon>
        </a>
        <span>{{ category.name }}</span>
      </li>
    </ul>
    <ul v-else class="ml-5 mt-5 has-text-grey">
      <li>カテゴリーがありません。</li>
    </ul>
  </section>
</template>

<script>
import firebase from "~/plugins/firebase";

export default {
  data() {
    return {
      name: "",
      categories: [],
    };
  },
  created() {
    // 認証
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) this.$router.push('/login');
      // カテゴリーの取得
      this.$store.dispatch("categories/init", user.uid);
      this.categories = this.$store.getters['categories/dbCategories'];
    });
  },
  methods: {
    create() {
      this.$store.dispatch("categories/create", {
        name: this.name,
      });
      this.name = '';
    },
    remove(id) {
      this.$store.dispatch("categories/remove", id);
    }
  },
};
</script>
