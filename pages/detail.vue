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
    <b-button type="is-primary" outlined @click="update()">更新</b-button>
    <b-button type="is-primary" outlined @click="remove()" class="ml-5">削除</b-button>
  </section>
</template>

<script>
export default {
  props: ['item'],
  data() {
    return {
      title: "",
      memo: "",
      imageUrl: "",
      id: "",
      fileUrl: "",
    };
  },
  created() {
    this.title = this.$route.query.title;
    this.memo = this.$route.query.memo;
    this.imageUrl = this.$route.query.imageUrl;
    this.id = this.$route.query.id;
    this.fileUrl = this.$route.query.fileUrl;
  },
  methods: {
    update() {
      this.$store.dispatch("items/update", {
        title: this.title,
        memo: this.memo,
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
