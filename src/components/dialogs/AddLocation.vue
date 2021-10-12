<template>
  <v-dialog v-model="addLocationDialogVisible" max-width="90%">
    <v-card>
      <v-card-title>
        <v-spacer></v-spacer>
        <v-icon id="close" aria-label="Close" @click="closeDialog()">mdi-close</v-icon>
      </v-card-title>
      <v-card-text class="pt-0 pb-0">
        <LocationsMap :markers="markers" :userUuid="userUuid" @updateMarkers="addMarkersHandler"></LocationsMap>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          id="exit"
          color="primary"
          text
          @click="closeDialog()"
        >{{ $t('generic.buttons.exit')}}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import LocationsMap from '@/components/LocationsMap'
import { mapState } from 'vuex'
export default {
  name: 'addLocation',
  props: {
    markers: { type: Array, default: () => []},
    userUuid: { type: String, required: true }
  },
  components: {
    LocationsMap,
  },
  computed: {
    ...mapState('application', ['addLocationDialogVisible'])
  },
  methods: {
    addMarkersHandler(markers) {
      this.$emit('updateMarkers', markers);
    },
    closeDialog() {
      this.$store.commit('application/isAddLocationDialogVisible', false);
    }
  }
}
</script>
