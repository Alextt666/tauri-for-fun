<template>
  <div>
    <video width="400" height="400" ref="local" autoplay controls></video>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useCamera } from "@/hooks/useCamera.js";
const local = ref(null);
onMounted(async () => {
  await useCamera(local.value, true);
});
</script>
