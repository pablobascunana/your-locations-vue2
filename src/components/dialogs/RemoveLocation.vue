<template>
  <v-dialog v-model="removeLocationDialogVisible" max-width="500px">
    <v-card>
      <v-card-title>
        {{ $t('locations.delete') }}
        <v-spacer></v-spacer>
        <v-icon id="close" aria-label="Close" @click="closeDialog()">mdi-close</v-icon>
      </v-card-title>
      <v-card-text class="pt-0 pb-0 text-center">
        <p>{{ $t('locations.confirmMessage') }}<span class="font-weight-bold"> {{ marker.title }}</span>?</p>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          id="removeLocation"
          color="red"
          text
          @click="deleteLocation()"
        >{{ $t('generic.buttons.delete')}}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Api from '@/api/services';
import { mapState } from 'vuex'
export default {
  name: 'removeLocation',
  props: {
    marker: { type: Object, default: () => {}},
    userUuid: { type: String, required: true }
  },
  computed: {
    ...mapState('application', ['removeLocationDialogVisible'])
  },
  methods: {
    async deleteLocation() {
      try {
        let { data } = await Api.deleteLocation(this.userUuid, this.marker);
        this.updateMarkersAndCloseDialog(data.markers);
      } catch (error) {
        this.showErrorSnackBarAndCloseDialog
      }
    },
    updateMarkersAndCloseDialog(markers) {
      this.$emit('updateMarkers', markers);
      this.closeDialog();
    },
    showErrorSnackBarAndCloseDialog() {
      this.EventBus.$emit('showSnackBar', { 
        snackBarMessage: this.$t('locations.error.deleteGeneric'),
        snackBarColor: 'error'
      });
      this.closeDialog();
    },
    closeDialog() {
      this.$store.commit('application/isRemoveLocationDialogVisible', false);
    }
  }
}
</script>

<style>

</style>