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
    </nav>

    <section class="main-content columns">
      <aside class="column is-2 mx-3 py-5">
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
export default {
  data () {
    return {
      items: [
        {
          title: '投稿一覧',
          icon: 'apps',
          to: { name: 'index' }
        },
        {
          title: '新規投稿',
          icon: 'plus',
          to: { name: 'create' }
        },
      ]
    }
  }
}
</script>

<style scoped>
.navbar-item {
  font-size: 1.5rem;
}
</style>
