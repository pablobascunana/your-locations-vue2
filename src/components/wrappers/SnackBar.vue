<template>
  <v-snackbar
    :color="color"
    :top="true"
    v-model="showSnackBar"
  >
    {{ message }}
  </v-snackbar>
</template>

<script>
export default {
  name: "snackBar",
  props: {
    color: { type: String, required: true },
    message: { type: String, required: true }
  },
  data() {
    return {
      showSnackBar: true
    }
  },
  mounted() {
    setTimeout(() => {
      this.showSnackBar = false;
      this.$emit('close');
    }, 8000);
  }
}
</script>
