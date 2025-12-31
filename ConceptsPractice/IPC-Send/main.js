
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

ipc.on('send-text', (event)=>{
    console.log("received")
    event.sender.send("message-reply", "Got it!");
})


app.on('ready', createWindow);

app.on('window-all-closed', ()=>{
    if (process.platform !== 'darwin'){
        app.quit()
    }
});