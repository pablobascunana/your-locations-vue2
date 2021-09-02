<template>
  
  <v-form ref="registerForm" @keyup.enter="doRegister" v-model="isFormRegisterValid">
    <v-card :elevation="10" rounded="0">
      <v-card-title class="justify-center">{{ $t('register.title') }}</v-card-title>
      <v-card-text class="pt-0 pb-2">
        <v-row>
          <v-col xl="4" lg="4" md="6" sm="6" cols="12">
            <v-text-field
              id="userName"
              :label="$t('register.userName')"
              type="text"
              v-model="user.userName"
              :rules="[formRules.required, formRules.maxLength]"
              autocomplete="off"
            ></v-text-field>
          </v-col>
          <v-col xl="4" lg="4" md="6" sm="6" cols="12">
            <v-text-field
              id="name"
              :label="$t('register.name')"
              type="text"
              v-model="user.name"
              :rules="[formRules.required, formRules.maxLength]"
              autocomplete="off"
            ></v-text-field>
          </v-col>
          <v-col xl="4" lg="4" md="6" sm="6" cols="12">
            <v-text-field
              id="lastName"
              :label="$t('register.lastName')"
              type="text"
              v-model="user.lastName"
              :rules="[formRules.required, formRules.maxLength]"
              autocomplete="off"
            ></v-text-field>
          </v-col>
          <v-col xl="4" lg="4" md="6" sm="6" cols="12">
            <v-text-field
              id="email"
              :label="$t('register.email')"
              type="text"
              v-model="user.email"
              :rules="[formRules.required, formRules.validEmail]"
              autocomplete="off"
            ></v-text-field>
          </v-col>
          <v-col xl="4" lg="4" md="6" sm="6" cols="12">
            <v-text-field
              id="password"
              :label="$t('register.password')"
              :type="showPassword ? 'text' : 'password'"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              v-model="user.password"
              :rules="[formRules.required, formRules.sameRepeteadPassword, formRules.maxLength]"
              autocomplete="off"
              @click:append="showPassword = !showPassword"
            ></v-text-field>
          </v-col>
          <v-col xl="4" lg="4" md="6" sm="6" cols="12">
            <v-text-field
              id="repeteadPassword"
              :label="$t('register.repeteadPassword')"
              :type="showRepeatedPassword ? 'text' : 'password'"
              :append-icon="showRepeatedPassword ? 'mdi-eye' : 'mdi-eye-off'"
              v-model="user.repeteadPassword"
              :rules="[formRules.required, formRules.samePassword, formRules.maxLength]"
              autocomplete="off"
              @click:append="showRepeatedPassword = !showRepeatedPassword"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn
          id="back" 
          :elevation="0"
          :ripple="false"
          @click.prevent="goToLogin"
        >{{ $t('generic.buttons.back') }}
        </v-btn>
        <v-btn
          id="register"
          :disabled="!isFormRegisterValid"
          :elevation="0"
          @click.prevent="doRegister"
        >{{ $t('generic.buttons.register') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
import Api from '@/api/services';
export default {
  name: "Register", 
  data() {
    return {
      isFormRegisterValid: false,
      user: {
        userName: '',
        name: '',
        lastName: '',
        email: '',
        password: '',
        repeteadPassword: '',
      },
      showPassword: false,
      showRepeatedPassword: false
    }
  },
  watch: { 
    user: {
      handler(value) {
        if (value.password === value.repeteadPassword) {
          this.$refs.registerForm.resetValidation();
        }
      },
      deep: true
    }
  },
  methods: {
    async doRegister() {
      try {
        const user = {...this.user};
        delete user.repeteadPassword;
        await Api.register(user);
        this.EventBus.$emit('showSnackBar', { 
          snackBarMessage: `${this.$t('register.messages.success1')} ${this.user.userName} ${this.$t('register.messages.success2')}`
        });
        this.goToLogin();
      } catch(error) {
        this.EventBus.$emit('showSnackBar', { 
          snackBarMessage: this.checkError(error.response.data),
          snackBarColor: 'error'
        });
      }
    },
    goToLogin() {
      this.$router.push({ name: 'login'});
    },
    checkError(errorMessage) {
      if (errorMessage.includes('userName')) {
        return `${this.$t('register.messages.userNameError')} ${this.user.userName} ${this.$t('register.messages.exists')}`;
      } else if (errorMessage.includes('email')) {
        return `${this.$t('register.messages.emailError')} ${this.user.email} ${this.$t('register.messages.exists')}`;
      }
      return `${this.$t('register.messages.error')} ${this.user.userName}`;      
    }
  }
}
</script>
