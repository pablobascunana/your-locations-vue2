<template>
  <v-dialog v-model="removeLocationDialogVisible" max-width="500px">
    <v-card>
      <v-card-title>
        {{ $t('locations.delete') }}
        <v-spacer></v-spacer>
        <v-icon aria-label="Close" @click="closeDialog()">mdi-close</v-icon>
      </v-card-title>
      <v-card-text class="pt-0 pb-0 text-center">
        <p>¿Está seguro de eliminar la localización <span class="font-weight-bold">{{ marker.title }}</span>?</p>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          text
          @click="closeLocation()"
        >{{ $t('generic.buttons.exit')}}
        </v-btn>
        <v-btn
          color="primary"
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
        this.$emit('updateMarkers', data.markers);
        this.closeDialog();
      } catch (error) {
        this.EventBus.$emit('showSnackBar', { 
          snackBarMessage: this.$t('locations.error.deleteGeneric'),
          snackBarColor: 'error'
        });
        this.closeDialog();
      }
    },
    closeDialog() {
      this.$store.commit('application/isRemoveLocationDialogVisible', false);
    }
  }
}
</script>

<style>

</style>