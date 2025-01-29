// Modules to control application life and create native browser window
const { app, BrowserWindow, Tray, Menu } = require('electron')
const path = require('node:path')

let mainWindow
let tray
const RESOURCES_PATH = app.isPackaged ? path.join(process.resourcesPath, 'assets') : path.join(__dirname, '../assets');
const getAssetPath = (...paths) => {
  return path.join(RESOURCES_PATH, ...paths);
};

function createTray() {
  tray = new Tray('assets/worldwide.ico');

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Open App', click: () => mainWindow.show() },
    {
      label: 'Quit', click: () => {
        app.isQuiting = true;
        tray.destroy();
        app.quit();
        process.exit(0);
        mainWindow = null;
      }
    }
  ]);

  tray.setToolTip('My Electron App'); // Set a tooltip for the tray icon
  tray.setContextMenu(contextMenu);
  tray.on('click', () => {
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
  });
}

const iconPath = path.join(__dirname, './assets/icon.ico');

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 640,
    minHeight: 480,
    icon: getAssetPath('worldwide.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
    title: "Azkar",
    show: false,
    fullscreenable: false,
    autoHideMenuBar: true, // Hides the menu bar
    frame: true
  })
  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  mainWindow.on('close', (event) => {
    event.preventDefault(); // Prevent the default close action
    mainWindow.hide(); // Hide the window instead of closing
  });
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
  mainWindow.once('ready-to-show', mainWindow.show)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  createTray()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
