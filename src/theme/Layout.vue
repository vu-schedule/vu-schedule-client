<template>
  <div id="app">
    <app-header></app-header>
    <div class="main-section section">
      <div class="container content">
          <router-view></router-view>
      </div>
    </div>
    <app-footer></app-footer>
  </div>
</template>
<script>
  import AppHeader from './AppHeader.vue'
  import AppFooter from './AppFooter.vue'
  import appService from '../app.service.js'
  export default {
    components: {
      'app-header': AppHeader,
      'app-footer': AppFooter
    }
  }
</script>
<style lang="scss">
@import '~bulma';

  .columns{
    flex-wrap: wrap
  }

</style>

