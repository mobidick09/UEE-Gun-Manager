const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1600,
    height: 900,
    autoHideMenuBar: true,
     icon: path.join(__dirname, 'icon.ico')
  });

  win.loadFile('UEE_Gun_Manager.html');
}

app.whenReady().then(createWindow);