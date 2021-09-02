<template>
  <div>
    <LocationsTable
      :markers="markers"
      :userUuid="userUuid"
      @updateMarkers="updateMarkersHandler"
    ></LocationsTable>
    <AddLocationDialog
      :markers="markers"
      :userUuid="userUuid"
    ></AddLocationDialog>
  </div>
</template>

<script>
import Api from '@/api/services';
import LocationsTable from '@/components/LocationsTable'
import { mapState } from 'vuex'
export default {
  name: 'locationsHistory',
  components: {
    AddLocationDialog: () => import('@/components/dialogs/AddLocation'),
    LocationsTable
  },
  data() {
    return {
      markers: []
    }
  },
  computed: {
    ...mapState('user', ['userUuid']),
  },
  mounted() {
    this.getLocations();
  },
  methods: {
    async getLocations() {
      try{
        let { data } = await Api.getLocations(this.userUuid);
        this.markers = data.markers;
      } catch (error) {
        this.showErrorSnackBar(error.response.status);
      }
    },
    showErrorSnackBar(status) {
      if (status !== 404) {
        this.EventBus.$emit('showSnackBar', { 
          snackBarMessage: this.$t('locations.error.getGeneric'),
          snackBarColor: 'error'
        });
      }
    },
    updateMarkersHandler(markers) {
      this.markers = markers;
    }
  }
}
</script>

<style>

</style>