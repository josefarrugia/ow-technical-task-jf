<script setup lang="ts">
import { ref, onBeforeMount, onBeforeUnmount } from 'vue';

type GoogleMapInterface = {
  long: number;
  lat: number;
  zoom: number;
};

const props = defineProps<GoogleMapInterface>();

const map = ref(null);
const mapDivRef = ref(null);

onBeforeMount(() => {
  const key = import.meta.env.VITE_GOOGLEMAPS_KEY;

  const googleMapScript = document.createElement('SCRIPT');
  googleMapScript.id = 'google-map-embed';
  googleMapScript.setAttribute('src', `https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap`);

  googleMapScript.setAttribute('defer', '');
  googleMapScript.setAttribute('async', '');

  document.head.appendChild(googleMapScript);

  // @FIXME: Fix type issue here
  window.initMap = () => {
    map.value = new window.google.maps.Map(mapDivRef.value, {
      zoom: props.zoom || 8,
      disableDefaultUI: true,
      center: { lat: props.lat, lng: props.long },
    });

    new window.google.maps.Marker({
      position: { lat: props.lat, lng: props.long },
      map: map.value,
    });
  };
});

onBeforeUnmount(() => {
  // @FIXME: Figure out how to remove the multiple google map script tags
  const script = document.getElementById('google-map-embed');
  script?.remove();
});
</script>

<template>
  <div class="map" ref="mapDivRef" />
</template>

<style lang="css" scoped>
.map {
  width: 100%;
  height: 400px;
  background-color: #ccc;
}
</style>
