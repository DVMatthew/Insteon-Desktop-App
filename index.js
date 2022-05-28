const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

const WIDTH = 840;
const HEIGHT = 692;

const createWindow = () => {
  const win = new BrowserWindow({
    width: WIDTH,
    height: HEIGHT,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.webContents.openDevTools();

  win.loadFile("./html/index.htm");
};

const schedulingWindow = () => {
  const schedulingWindow = new BrowserWindow({
    width: WIDTH,
    height: HEIGHT,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  schedulingWindow.webContents.openDevTools();

  schedulingWindow.once("ready-to-show", () => {
    schedulingWindow.show();
  });

  schedulingWindow.loadFile("./html/scheduler.htm");
};

ipcMain.on("openSchedulerWindow", (e, arg) => {
  schedulingWindow();
});

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

try {
  require("electron-reloader")(module, {
    debug: true,
    watchRenderer: true,
  });
} catch (_) {
  console.log("Error");
}
