
const electron = require("electron")
const path = require("path")
const BrowserWindow = electron.BrowserWindow
const url = require("url")
const app = electron.app;
const ipc = electron.ipcMain

let win;

const createWindow=()=>{
    //create browser window
    win = new BrowserWindow({
        alwaysOnTop: true,
        webPreferences:{
            preload: path.join(__dirname, "preload.js"),
            contextIsolation: true,  // Required for contextBridge to work
            nodeIntegration: false   // More secure
        }
    });

    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol:'file',
        slashes: true,

    }))

    win.on('closed', ()=>{
        win = null;
    })
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}



ipc.handle('get-random', ()=>{
    return Math.floor(Math.random() * 100) + 1; // 1–100
}); 


app.on('ready', createWindow);

app.on('window-all-closed', ()=>{
    if (process.platform !== 'darwin'){
        app.quit()
    }
});