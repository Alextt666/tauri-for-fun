import { defineStore } from "pinia";

export const useCameraStore = defineStore("camera", {
  state: () => {
    return {
      cameraList: [],
      currentCamera: null,
      currentStream: null, // 句柄
      temporarily: {
        camera: null,
        stream: null,
      },
      remotes: {
        stream: null,
      },
    };
  },
  actions: {
    updateTempCamera(id) {
      this.temporarily.camera = id;
    },
    updateTempStream(stream) {
      this.temporarily.stream = stream;
    },
    updateCurrentCamera(id) {
      this.currentCamera = id;
    },
    updateCurrentStream(stream) {
      this.currentStream = stream;
    },
    updateCameraList(list) {
      this.cameraList.length = 0;
      list.forEach((device) => this.cameraList.push(device));
      return this.cameraList.length;
    },
    updateToCurrent() {
      this.updateCurrentCamera(this.temporarily.camera);
      this.updateCurrentStream(this.temporarily.stream);
    },
    init() {
      this.updateCurrentCamera(this.cameraList[0].deviceId);
    },
  },
});
