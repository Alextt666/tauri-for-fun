import {
  availableMonitors,
  WebviewWindow,
  getAll,
} from "@tauri-apps/api/window";

const baseOption = {
  label: "alex",
  url: "https://www.baidu.com",
};

export const isTauri = () => {
  return Boolean(window && window.__TAURI_IPC__);
};

export const createSecWindow = async ({ label, url } = baseOption) => {
  if (!isTauri()) return;
  try {
    let sec_position;
    await availableMonitors().then((res) => {
      sec_position = res[0].size.width; // init SEC_POSITION
    });
    if (label && typeof label == "string") {
      console.log(label);
      const webview = new WebviewWindow(label, {
        url,
        x: sec_position,
        y: 0,
        title: "ex-player",
        // fullscreen: true,
      });

      return webview;
    }
  } catch (e) {
    throw new Error("Unexpect - window - label - require - string ");
  }
};

export const allWindow = async () => {
  const list = await getAll();
  return list;
};

export const windowWithLabel = async (label) => {
  const window = WebviewWindow.getByLabelUnchecked(label)
  return window;
};
