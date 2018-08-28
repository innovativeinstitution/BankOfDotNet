<template>
  <div id="app">
    <mdc-toolbar fixed>
      <mdc-toolbar-row>
        <mdc-toolbar-section align-start>
          <mdc-toolbar-menu-icon event="toggle-drawer"></mdc-toolbar-menu-icon>
          <mdc-toolbar-title>Vue.js BankOfDotNet</mdc-toolbar-title>
        </mdc-toolbar-section>
        <mdc-toolbar-section align-end>
          <mdc-toolbar-icon @click="login" icon="person"></mdc-toolbar-icon>
        </mdc-toolbar-section>
      </mdc-toolbar-row>
    </mdc-toolbar>
    <mdc-drawer slot="drawer" toggle-on="toggle-drawer">
      <mdc-drawer-list>
        <mdc-drawer-item start-icon="home" :to="{name: 'CustomersView'}" :class="['mdc-list-item', $route.name === 'CustomersView' ? 'mdc-list-item--activated' : '']">Customers</mdc-drawer-item>
      </mdc-drawer-list>
    </mdc-drawer>
    <main>
      <router-view></router-view>
      <mdc-snackbar />
    </main>
  </div>
</template>

<script>
  import applicationUserManager from './applicationusermanager'
  export default {
    name: 'app',
    data () {
      return {
        user: {
          name: '',
          isAuthenticated: false
        }
      }
    },
    watch: {
      async '$route' (to, from) {
        await this.refreshUserInfo()
      }
    },
    async created () {
      await this.refreshUserInfo()
    },
    methods: {
      async login () {
        try {
          await applicationUserManager.login()
        } catch (error) {
          console.log(error)
          this.$root.$emit('show-snackbar', { message: error })
        }
      },
      async logout () {
        try {
          await applicationUserManager.logout()
        } catch (error) {
          console.log(error)
          this.$root.$emit('show-snackbar', { message: error })
        }
      },
      async refreshUserInfo () {
        const user = await applicationUserManager.getUser()
        if (user) {
          this.user.name = user.profile.name
          this.user.isAuthenticated = true
        } else {
          this.user.name = ''
          this.user.isAuthenticated = false
        }
      }
    }
  }
</script>

<style>
  @import url('https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css');
  @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500');
  @import url('https://fonts.googleapis.com/css?family=Roboto+Mono:300,400,500');

  body {
    font-family: Roboto, sans-serif;
  }
</style>
