<template>
  <section class="px-5 mt-3">

    <div class="columns is-centered my-5">
      <h2 class="title is-3 has-text-grey">ログイン</h2>
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
      <b-button type="is-primary" outlined class="button" @click="login()">ログイン</b-button>
    </div>
    <div class="columns is-centered">
      <div class="has-text-right column is-4">
        <router-link to="/register" class="">会員登録へ</router-link>
      </div>
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
    }
  },
  methods: {
    login() {
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(() => {
          firebase.auth().signInWithEmailAndPassword(this.email, this.password)
            .then((userCredential) => {
            this.$router.push('/');
          })
          .catch(error => {
            if (error.code === 'auth/invalid-email') alert('メールアドレスを正しく入力してください。');
            if (error.code === 'auth/wrong-password') alert('ログイン情報が正しくありません。');
          });
        })
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>