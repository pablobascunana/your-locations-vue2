<template>
  <v-app id="app">
    <v-main>
      <AppBar v-if="!isLogin"></AppBar>
      <v-container fill-height> 
        <v-row>
          <v-col cols="12">
            <router-view />
          </v-col>
        </v-row>
        <SnackBar
          :color="snackBarColor"
          :message="snackBarMessage"
          v-if="showSnackBar"
          @close="snackBarHandler">
        </SnackBar>
        <LogoutDialog></LogoutDialog>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'app',
  components: {
    AppBar: () => import('@/components/AppBar'),
    SnackBar: () => import('@/components/wrappers/SnackBar'),
    LogoutDialog: () => import('@/components/dialogs/Logout')
  },
  computed: {
    ...mapState('application', ['isLogin'])
  },
  mounted() {
    this.EventBus.$on('showSnackBar', (data) => {
      this.fillAndShowSnackBar(data);
    });
  },
  data() {
    return {
      showSnackBar: false,
      snackBarColor: '',
      snackBarMessage: ''
    }
  },
  methods: {
    fillAndShowSnackBar(data) {
      this.snackBarColor = typeof data.snackBarColor !== 'undefined' ? data.snackBarColor : 'success';
      this.snackBarMessage = data.snackBarMessage;
      this.showSnackBar = true;
    },
    snackBarHandler() {
      this.showSnackBar = false;
    },
  }
}
</script>
