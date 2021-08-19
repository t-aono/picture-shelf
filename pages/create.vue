<template>
  <section class="px-5 mt-3">
    <h2 class="title is-3 has-text-grey">新規投稿</h2>

    <article class="message is-warning" v-show="error">
      <div class="message-body">
        タイトルと画像は必須です。
      </div>
    </article>

    <b-field label="タイトル">
      <b-input v-model="title" required></b-input>
    </b-field>
    <b-field label="メモ">
      <b-input
        rows="2"
        maxlength="100"
        type="textarea"
        v-model="memo"
      ></b-input>
    </b-field>

    <b-field>
      <b-upload v-model="file" drag-drop required>
        <section class="section">
          <div class="content has-text-centered">
            <p>
              <b-icon icon="upload" size="is-large"> </b-icon>
            </p>
            <p>画像ファイルをドロップしてください。</p>
          </div>
        </section>
      </b-upload>
    </b-field>
    <div class="tags">
      <span class="tag is-primary" v-if="file">
        {{ file.name }}
        <button class="delete" type="button" @click="this.file = null"></button>
      </span>
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
      <b-button v-if="loading" type="is-primary" outlined class="button is-loading">送信</b-button>
      <b-button v-else type="is-primary" outlined @click="create()">送信</b-button>
    </div>

  </section>
</template>

<script>
import firebase from "~/plugins/firebase";

export default {
  data() {
    return {
      title: "",
      memo: "",
      file: null,
      type: "",
      dataUrl: "",
      categories: [],
      category: "未分類",
      error: false,
      loading: false,
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
  },
  methods: {
    create() {
      if (this.title && this.fileName) {
        this.loading = true;
        this.$store.dispatch("items/create", {
          title: this.title,
          memo: this.memo,
          file: { 
            name: this.fileName, 
            type: this.type, 
            dataUrl: this.dataUrl, 
          },
          category: this.category,
        });
      } else {
        this.error = true;
      }
    },
  },
  watch: {
    file(val) {
      this.fileName = val.name;
      if (val.type == "image/jpeg") this.type = "jpeg";
      else if (val.type == "image/png") this.type = "png";
      else if (val.type == "image/gif") this.type = "gif";
      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = (e) => {
        this.dataUrl = e.target.result;
      };
    },
  },
};
</script>
