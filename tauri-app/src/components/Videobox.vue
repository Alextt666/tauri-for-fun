<template>
  <div style="width: 90vw; height: 90vh">
    <video width="100%" height="100%" ref="videobox" autoplay></video>
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
<script setup>
import { ref, onMounted } from "vue";
import { availableMonitors } from "@tauri-apps/api/window";
import { WebviewWindow } from "@tauri-apps/api/window";

const videobox = ref();
const deviceList = ref([]);
const SEC_POSITION = ref(0);
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
const createSecWindow = () => {
  const webview = new WebviewWindow("my-label", {
    url: "https://h5-static.talk-cloud.net/static/preview_1.41/index.html?url=%2Fdocument%2F115996_20240325_111827_grcdhvtf%2Fnewppt.html&fileId=123761963&filename=PEPG3B2_U2L1.pptx&filetype=pptx&showTip=true",
    x: SEC_POSITION.value,
    y: 0,
    fullscreen: true,
  });
};
const isTauri = () => {
  return Boolean(window && window.__TAURI_IPC__);
};
onMounted(async () => {
  if (isTauri()) {
    await availableMonitors().then((res) => {
      SEC_POSITION.value = res[0].size.width; // init SEC_POSITION
    });
  }

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
  if (isTauri()) {
    createSecWindow();
  }
});
</script>
<style></style>
