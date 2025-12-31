const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require("path");
const url = require("url");
const ipc = electron.ipcMain;

let win;
function createWindow(){
    win = new BrowserWindow({
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
            
        },
        show: false
    });
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
    }));


    win.once('ready-to-show', ()=>{
        win.show();
    })

    win.on('closed', ()=>{
        win = null;
    })
}

ipc.handle('sendText', (event, text)=>{
    return text;
})

app.on('ready', createWindow);

app.on('window-all-closed', ()=>{
    if (process.platform !=='darwin'){
        app.quit()
    }
})