<template>
    <div>
      <video width="400" height="400" ref="local" autoplay></video>
    </div>
    <div>
      <p>{{ c?.currentStream?.id }}</p>
    </div>
  </template>
  <script setup>
  import { onMounted, ref, watch } from "vue";
  import { useCamera } from "@/hooks/useCamera.js";
  import { useCameraStore } from "@/store/camera.js";
  const local = ref(null);
  const c = useCameraStore();
  onMounted(async () => {
    await useCamera(local.value, true);
    watch(
      () => c.currentStream,
      () => {
        local.value.srcObject = c.currentStream;
      }
    );
  });
  </script>
  