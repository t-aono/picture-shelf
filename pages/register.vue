<template>
  <section class="px-5 mt-3">

    <div class="columns is-centered my-5">
      <h2 class="title is-3 has-text-grey">会員登録</h2>
    </div>
    <div class="columns is-centered">
      <b-field label="メールアドレス" class="column is-4">
        <b-input v-model="email" required></b-input>
      </b-field>
    </div>
    <div class="columns is-centered">
      <b-field label="パスワード" class="column is-4">
        <b-input v-model="password" required></b-input>
      </b-field>
    </div>
    <div class="columns is-centered mt-5 mb-6">
      <b-button type="is-primary" outlined class="button" @click="register()">登録</b-button>
    </div>
    <div class="columns is-centered">
      <div class="has-text-right column is-4">
        <router-link to="/login" class="">ログインへ</router-link>
      </div>
    </div>

<div class="columns is-centered">
    <article class="column is-6 message is-warning" v-show="error">
      <div class="message-body">{{ error }}</div>
    </article>
</div>

  </section>
</template>

<script>
import firebase from '~/plugins/firebase'

export default {
  data() {
    return {
      email: '',
      password: '',
      message: '',
      error: '',
    }
  },
  methods: {
    register() {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then((userCredential) => {
        this.$router.push('/');
      })
      .catch(error => {
        if (error.code === 'auth/invalid-email') this.error = 'メールアドレスを正しく入力してください。';
        if (error.code === 'auth/weak-password') this.error = '８文字以のパスワードをで入力してください。';
        if (error.code === 'auth/email-already-in-use') this.error = 'このメールアドレスは登録済みです。';
      });
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>