<template>
  <div>
    <h2 class="text-center">{{ $t('locations.title') }}</h2>
    <v-container class="pl-0">
      <v-row class="justify-center">
        <v-col xl="10" lg="10" md="8" sm="8" xs="8">
          <gmap-autocomplete
            id="searchLocation"
            class="autocomplete_input"
            @place_changed="setPlace"
            @keyup.enter="addMarker">
          </gmap-autocomplete>
        </v-col>
        <v-btn
          id="addLocation"
          color="primary"
          @click="addMarker"
        >{{ $t('generic.buttons.add' )}}
        </v-btn>
      </v-row>
    </v-container>
    <GmapMap
      ref="mapRef"
      :center="center"
      :zoom="12"
      map-type-id="satellite"
      :options="mapOptions"
      style="width: 100%; height: 500px"
    >
      <GmapMarker
        :key="index"
        v-for="(marker, index) in markers"
        :position="marker.position"
        :clickable="true"
        :draggable="false"
        @click="center=marker.position"
      />
  </GmapMap>
  </div>
</template>

<script>
import Api from '@/api/services';
export default {
  name: 'locationsMap',
  props: {
    markers: { type: Array, default: () => []},
    userUuid: { type: String, required: true }
  },
  data() {
    return {
      center: { lat: 45.508, lng: -73.587 },
      currentPlace: null,
      mapOptions: {
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true,
        disableDefaultUi: false
      }
    }
  },
  mounted() {
    this.geolocate();
  },
  methods: {
    setPlace(place) {
      this.currentPlace = place;
    },
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        };
        const markersCopy = [...this.markers]
        markersCopy.push({ position: marker, title: this.currentPlace.name });
        this.center = marker;
        this.currentPlace = null;
        this.saveLocation(markersCopy);
      }
    },
    geolocate() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    },
    async saveLocation(markersCopy) {
      try {
        const body = { markers: markersCopy, userId: this.userUuid };
        let { data } = await Api.saveLocation(this.userUuid, body);
        this.showSuccessSnackBarAndAddMarker(data.markers);
      } catch(error) {
        this.showErrorSnackBar();
      }
    },
    showSuccessSnackBarAndAddMarker(marker) {
      this.EventBus.$emit('showSnackBar', { 
        snackBarMessage: this.$t('locations.success.save'),
      });
      this.markers.push(marker.at(-1));
    },
    showErrorSnackBar() {
      this.EventBus.$emit('showSnackBar', { 
        snackBarMessage: this.$t('locations.error.saveGeneric'),
        snackBarColor: 'error'
      });
    }
  }
}
</script>

<style scoped>
.autocomplete_input {
  width: 100%;
  outline-width: inherit;
  border-bottom: solid 1px;
}
</style>