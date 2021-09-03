<template>
  <v-form ref="loginForm">
    <h1 class="text-center pb-12">{{ $t('login.title') }}</h1>
    <v-row class="justify-center">
      <v-col xl="4" lg="4" md="6" sm="6" cols="8">
        <v-text-field
          id="userName"
          :label="$t('login.username')"
          prepend-icon="mdi-email-outline"
          :rules="[formRules.loginCredentials]"
          type="text"
          v-model="user.userName"
          @keyup.enter="doLogin"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="justify-center">
      <v-col xl="4" lg="4" md="6" sm="6" cols="8">
        <v-text-field
          id="password"
          autocomplete="off"
          :label="$t('login.password')"
          prepend-icon="mdi-lock-outline"
          :rules="[formRules.loginCredentials]"
          type="password" 
          v-model="user.password"
          @keyup.enter="doLogin"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="justify-center mt-6">
      <v-btn
        id="login"
        color="primary"
        :elevation="0"
        @click.prevent="doLogin"
      >{{ $t('login.loginBtn') }}
      </v-btn>
    </v-row>
    <v-row class="justify-center mt-12">
      <a
        id="register"
        :ripple="false"
        text
        @click="goToRegister"
      >{{ $t('generic.buttons.register') }}
      </a>
    </v-row>
  </v-form>
</template>

<script>
import Api from '@/api/services';
export default {
  name: 'Login',
  data() {
    return {
      user: {
        userName: '',
        password: ''
      }
    } 
  },
  methods: {
    async doLogin() {
      try {
        let { data } = await Api.login(this.user);
        this.setStoreAndGoToHistoricalLocations(data);
      } catch(error) {
        this.checkWhatErrorIs(error.response.status);
      }
    },
    setStoreAndGoToHistoricalLocations(loginResponse) {
      this.$store.commit('user/setUserByToken', loginResponse.access_token);
      this.$store.commit('application/setAccessToken', loginResponse.access_token);
      this.$store.commit('application/setRefreshToken', loginResponse.refresh_token);
      this.$store.commit('application/isLogin', false);
      this.$store.commit('user/setUserName', this.user.userName);
      this.$router.push({ name: 'locations' });
    },
    goToRegister() {
      this.$router.push({ name: 'register' })
    },
    checkWhatErrorIs(status) {
      if (status === 401 || status === 404) {
        this.formRules.loginCredentials = false || this.$t('login.error.credentials');
        this.$refs.loginForm.validate();
      } else {
        this.EventBus.$emit('showSnackBar', { 
          snackBarMessage: this.$t('login.error.generic'),
          snackBarColor: 'error'
        });
      }
    }
  }
}
</script>
