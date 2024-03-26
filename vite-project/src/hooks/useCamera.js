import { useCameraStore } from "@/store/camera.js";

export async function useCamera(dom, init = false) {
  const cameraStore = useCameraStore();
  const list = await getCameraList();
  await cameraStore.updateCameraList(list);
  if (init) {
    await cameraStore.init();
  }
  const stream = await getLocalStream(cameraStore.currentCamera);
  await cameraStore.updateCurrentStream(stream);
  dom.srcObject = stream;
}

async function getCameraList() {
  const result = [];
  await navigator.mediaDevices.enumerateDevices().then((res) => {
    res.forEach((device) => {
      if (device.kind == "videoinput") {
        result.push(device);
      }
    });
  });
  return result;
}

export async function getLocalStream(deviceId = "") {
  const streamRes = await navigator.mediaDevices.getUserMedia({
    video: { deviceId },
    audio: false,
  });
  return streamRes;
}
