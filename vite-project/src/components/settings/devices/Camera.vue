<template>
  <div className="grid">
    <el-select
      v-model="currentDevice"
      placeholder="设备选择"
      @change="handleSelectChange"
    >
      <el-option
        v-for="device in deviceList"
        :key="device.deviceId"
        :label="device.label"
        :value="device.deviceId"
      />
    </el-select>
    <div>
      <video ref="settingVideo" width="400" controls autoplay></video>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useCameraStore } from "@/store/camera.js";
import { getLocalStream } from "@/hooks/useCamera.js";
const cameraStore = useCameraStore();
const settingVideo = ref(null);
const deviceList = ref([]);
const currentDevice = ref("default");
const handleSelectChange = async (e) => {
  const stream = await getLocalStream(e);
  settingVideo.value.srcObject = stream;
};
onMounted(() => {
  settingVideo.value.srcObject = cameraStore.currentStream;
  deviceList.value = cameraStore.cameraList;
  console.log(deviceList.value);
});
</script>
<style></style>
