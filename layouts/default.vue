<template>
  <div>
    <nav
      class="navbar header has-shadow is-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <div class="navbar-item">画像管理アプリ</div>
      </div>
      <div :class="['navbar-end', { 'd-none': !isLogined }]">
        <div class="navbar-item">
          <a class="button is-primary" @click="logout()">
            <b-icon icon="logout"></b-icon>
            <span>ログアウト</span>
          </a>
        </div>
      </div>
    </nav>

    <section class="main-content columns">
      <aside :class="['column' ,'is-2' ,'mx-3' ,'py-5', { 'd-none': !isLogined }]">
        <p class="menu-label is-hidden-touch">
          メニュー
        </p>
        <ul class="menu-list">
          <li
            v-for="(item, key) of items"
            :key="key"
          >
            <NuxtLink
              :to="item.to"
              exact-active-class="is-active"
            >
              <b-icon :icon="item.icon" /> {{ item.title }}
            </NuxtLink>
          </li>
        </ul>
      </aside>

      <div class="container column is-9">
        <Nuxt />
      </div>
    </section>
  </div>
</template>

<script>
import firebase from "~/plugins/firebase";

export default {
  data() {
    return {
      items: [
        {
          title: "投稿一覧",
          icon: "apps",
          to: { name: "index" },
        },
        {
          title: "新規投稿",
          icon: "plus",
          to: { name: "create" },
        },
        {
          title: "カテゴリー",
          icon: "format-list-bulleted",
          to: { name: "category" },
        },
      ],
      isLogined: false,
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) this.isLogined = true;
      else this.isLogined = false;
    });
  },
  methods: {
    logout() {
      if (window.confirm('ログアウトしますか？')) {
        firebase.auth().signOut().then(() => {
          this.$router.push('/login');
        })
      }
    }
  }
};
</script>

<style scoped>
.navbar-item {
  font-size: 1.5rem;
}
.d-none {
  display: none;
}
aside {
  white-space: nowrap;
}
</style>
