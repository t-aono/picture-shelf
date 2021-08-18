<template>
  <section class="px-5 mt-3">
    <h2 class="title is-3 has-text-grey">編集</h2>
    <b-field label="タイトル">
      <b-input v-model="this.$route.query.title" required></b-input>
    </b-field>
    <b-field label="メモ">
      <b-input rows="2" maxlength="100" type="textarea" v-model="this.$route.query.memo"></b-input>
    </b-field>
    <img :src="this.$route.query.imageUrl">

    <div class="tags">
      <span class="tag is-primary" v-if="file">
        {{ file.name }}
        <button class="delete" type="button"
          @click="this.file = null"
        ></button>
      </span>
    </div>
    <b-button type="is-primary" outlined @click="update()">更新</b-button>
    <b-button type="is-primary" outlined @click="remove()">削除</b-button>
  </section>
</template>

<script>
export default {
  props: ['item'],
  data() {
    return {
      title: "",
      memo: "",
      file: null,
      type: "",
      dataUrl: "",
    };
  },
  methods: {
    create() {
      this.$store.dispatch("items/create", {
        title: this.title,
        memo: this.memo,
        file: { name: this.fileName, type: this.type, dataUrl: this.dataUrl },
      });
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
