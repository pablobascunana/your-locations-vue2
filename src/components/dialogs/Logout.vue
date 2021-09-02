<template>
  <v-dialog v-model="logoutDialogVisible" max-width="500px">
    <v-card>
      <v-card-title>
        {{ $t('logout.title') }}
        <v-spacer></v-spacer>
        <v-icon aria-label="Close" @click="closeDialog()">mdi-close</v-icon>
      </v-card-title>
      <v-card-text class="text-center mt-10">
        <p>{{ $t('logout.message') }}</p>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn 
          id="logout" 
          color="primary"
          text
          @click="logout" 
        >{{ $t('generic.buttons.exit') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'logoutDialog',
  computed: {
    ...mapState('application', ['logoutDialogVisible'])
  },
  methods: {
    logout() {
      this.closeDialog();
      this.$store.commit('application/isLogin', false);
      this.$store.commit('resetStore');
      this.$router.push({ name: 'login' });
    },
    closeDialog() {
      this.$store.commit('application/isLogoutDialogVisible', false);
    }
  }
}
</script>
