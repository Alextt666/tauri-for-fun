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
      <video ref="settingVideo" width="400" autoplay></video>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, toRefs, watch } from "vue";
import { useCameraStore } from "@/store/camera.js";
import { getLocalStream } from "@/hooks/useCamera.js";
const props = defineProps(["confirm"]);
const cameraStore = useCameraStore();
const { updateTempCamera, updateTempStream } = cameraStore;
const { currentStream, cameraList, currentCamera } = toRefs(cameraStore);
const settingVideo = ref(null);
const deviceList = ref([]);
const currentDevice = ref("default");
const handleSelectChange = async (e) => {
  const stream = await getLocalStream(e);
  setStream(stream);
  updateTempStream(stream);
  updateTempCamera(e);
};
const setStream = (stream) => {
  settingVideo.value.srcObject = stream;
};
onMounted(() => {
  setStream(currentStream.value);
  deviceList.value = cameraList.value;
});
watch(
  () => props.confirm,
  () => {
    setStream(currentStream.value);
    currentDevice.value = currentCamera.value;
  }
);
</script>
