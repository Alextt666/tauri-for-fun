import { defineStore } from "pinia";

export const useCameraStore = defineStore("camera", {
  state: () => {
    return {
      cameraList: [],
      currentCamera: null,
      currentStream: null, // 句柄
    };
  },
  actions: {
    updateCurrentCamera(id) {
      this.currentCamera = id;
    },
    updateCameraList(list) {
      this.cameraList.length = 0;
      list.forEach((device) => this.cameraList.push(device));
      return this.cameraList.length;
    },
    updateCurrentStream(stream) {
      this.currentStream = stream;
    },
    init() {
      this.updateCurrentCamera(this.cameraList[0].deviceId);
    },
  },
});
