<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="markers"
      sort-by="title"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>{{ $t('locations.tableTitle') }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn
            id="showAddLocation"
            color="primary"
            dark
            @click="addLocation"
          >{{ $t('generic.buttons.add') }}
          </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-tooltip left>
          <template v-slot:activator="{ on }">
            <v-icon
              id="deleteLocation"
              small
              v-on="on"
              @click="deleteLocation(item)"
            >mdi-delete
            </v-icon>
          </template>
          <span>{{ $t('locations.delete') }}</span>
        </v-tooltip>
      </template>
    </v-data-table>
    <RemoveLocationDialog
      :marker="markerToDelete"
      :userUuid="userUuid"
      @updateMarkers="updateMarkersHandler"
    ></RemoveLocationDialog>
  </div>
</template>

<script>
export default {
  name: 'locationsTable',
  props: {
    markers: { type: Array, default: () => []},
    userUuid: { type: String, required: true }
  },
  components: {
    RemoveLocationDialog: () => import('@/components/dialogs/RemoveLocation')
  },
  data() {
    return {
      headers: [
        { text: 'Localización', value: 'title', align: 'center' },
        { text: 'Latitud', value: 'position.lat', align: 'center', sortable: false},
        { text: 'Longitud', value: 'position.lng', align: 'center', sortable: false},
        { text: 'Fecha', value: 'date', align: 'center', sortable: true },
        { text: 'Acciones', value: 'actions', align: 'center', sortable: false }
      ],
      markerToDelete: {}
    }
  },
  methods: {
    addLocation() {
      this.$store.commit('application/isAddLocationDialogVisible', true);
    },
    async deleteLocation(marker) {
      this.markerToDelete = marker;
      this.$store.commit('application/isRemoveLocationDialogVisible', true); 
    },
    updateMarkersHandler(marker) {
      this.$emit('updateMarkers', marker);
    }
  }
}
</script>
