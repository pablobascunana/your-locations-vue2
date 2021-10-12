import Vue from 'vue'

Vue.mixin({
  data() {
    return {
      formRules: {
        loginCredentials: true,
        required: value => !!value || this.$t('validations.required'),
        maxLength: value => value.length < 101 || this.$t('validations.maxLength'),
        validEmail: value => /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value) || this.$t('validations.validEmail'),
        samePassword: value => (value == this.user.password) || this.$t('validations.samePassword'),
        sameRepeteadPassword: value => (value == this.user.repeteadPassword) || this.$t('validations.samePassword'),
      }
    }
  }
})