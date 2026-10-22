const electronAPI = window.electronAPI;

export const ipcRenderer = {
  on(channel, callback) {
    electronAPI.ipc.on(channel, (...args) => callback({}, ...args));
  },
  send(channel, value) {
    electronAPI.ipc.send(channel, value);
  }
};

export const clipboard = {
  writeText(value) {
    electronAPI.clipboard.writeText(value);
  },
  writeImage(value) {
    electronAPI.clipboard.writeImageDataUrl(value);
  }
};

export const nativeImage = {
  createFromDataURL(value) {
    return value;
  }
};

export const walletDialog = electronAPI.dialog;

export const walletWindow = electronAPI.window;

export default {
  clipboard,
  nativeImage
};
