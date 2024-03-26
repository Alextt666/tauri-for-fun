<script setup>
import { ref, onMounted } from "vue";
const videobox = ref();
const deviceList = ref([]);
const handleOptions = async (e) => {
  const streamRes = await getLocalMedia(e.target.value);
  videobox.value.srcObject = streamRes;
};
const getLocalMedia = async (deviceId = "") => {
  const streamRes = await navigator.mediaDevices.getUserMedia({
    video: { deviceId },
    audio: false,
  });
  return streamRes;
};
const OBSdefault = (deviceList) => {
  // default
  const OBS = deviceList.value.filter(
    // ManyCam Virtual Webcam OBS Virtual Camera
    (device) => device.label === "OBS Virtual Camera"
  );
  return OBS[0]?.deviceId || "";
};
onMounted(async () => {
  await navigator.mediaDevices.enumerateDevices().then((res) => {
    res.forEach((device) => {
      if (device.kind == "videoinput") {
        deviceList.value.push(device);
      }
    });
  });
  const OBS = OBSdefault(deviceList);
  const streamRes = await getLocalMedia(OBS);
  videobox.value.srcObject = streamRes;
});
</script>

<template>
  <div style="margin-top: 20px">
    <video width="400px" height="400px" ref="videobox" autoplay></video>
    <select
      name="pets"
      id="pet-select"
      @change="handleOptions"
      v-if="deviceList.length > 1"
    >
      <option value="">--Please choose an Device--</option>
      <template v-for="item in deviceList">
        <option :value="item.deviceId">{{ item.label }}</option>
      </template>
    </select>
 
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
