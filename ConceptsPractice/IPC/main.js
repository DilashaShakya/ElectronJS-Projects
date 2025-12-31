// const {app, BrowserWindow, ipcMain} = require("electron")
const electron = require("electron")
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const ipc = electron.ipcMain
const path = require("path")
const url = require("url");
const dialog = electron.dialog;

let win;

function createWindow(){
    win = new BrowserWindow({
        width: 800, 
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })

    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol:'file',
        slashes:true
    }))

    win.on('closed', ()=>{
        win = null
    });
};

ipc.on('async-message', function(event){
    dialog.showErrorBox('An error message', 'Demo of an error message')
    event.sender.send('opened-async-message', 'Main process opened the error dialog')
})

ipc.on('sync-message', function(event){
    event.returnValue = 'sync-reply'
})
app.on('ready', createWindow);

app.on('window-all-closed', ()=>{
    if (process.platform !=='darwin'){
        app.quit()
    }
})