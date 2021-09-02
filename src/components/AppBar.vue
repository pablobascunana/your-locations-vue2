<template>
  <v-app-bar id="appBar" app color="terciary" dark height="75">
    <h4>{{ $t('appBar.welcome') }} {{ userName }}</h4>
    <v-spacer></v-spacer>
    <v-icon id="logout" class="mr-3" @click="logout()">mdi-exit-to-app</v-icon>
  </v-app-bar>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'appBar',
  computed: {
    ...mapState('application', ['logoutDialogVisible']),
    ...mapState('user', ['userName'])
  },
  methods: {
    logout() {
      this.$store.commit('application/isLogoutDialogVisible', true);
    }
  }
}
</script>
