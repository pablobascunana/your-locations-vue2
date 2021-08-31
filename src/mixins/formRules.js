import Vue from 'vue'

Vue.mixin({
  data() {
    return {
      formRules: {
        // loginCredentials: true,
        required: value => !!value || this.$t('validations.required'),
        // cif: value => /^([ABCDEFGHJKLMNPQRSUVW])(\d{7})([0-9A-J])$/.test(value) || this.$t('validation.cif'),
        maxLength: value => value.length < 101 || this.$t('validations.maxLength'),
        // textAreaMaxLength: value => value.length < 501 || this.$t('validation.textAreaMaxLength'),
        validEmail: value => /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value) || this.$t('validations.validEmail'),
        // postalCode: value => /^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/.test(value) || this.$t('validation.postalCode'),
        // telephone: value => (value == '' || /^(\+34|0034|34)?[679]{1}[0-9]{8}$/.test(value)) || this.$t('validation.telephone'),
        samePassword: value => (value == this.user.password) || this.$t('validations.samePassword'),
        sameRepeteadPassword: value => (value == this.user.repeteadPassword) || this.$t('validations.samePassword'),
        // imageSize: value => !value || value.size < 5000000 || this.$t('validation.imageSize'),
        // imageExtension: value => !value || (value.name.toLowerCase().endsWith('.png') || value.name.toLowerCase().endsWith('.jpg') || value.name.toLowerCase().endsWith('.jpeg')) || this.$t('validation.imageExtension'),
        // numberOfWorkers: value => value > 0 || this.$t('validation.workersNumberLessThanOne')
      }
    }
  }
})