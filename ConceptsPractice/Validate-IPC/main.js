// const {app, BrowserWindow, ipcMain} = require("electron")
const electron = require("electron")
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const ipc = electron.ipcMain
const path = require("path")
const url = require("url");


let win;

function createWindow(){
    win = new BrowserWindow({
        width: 800, 
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true
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

ipc.handle('validateNum',(event, text)=>{
    if (text.trim() === ""){
        return {ok: false, reason: 'text is empty!'}
    }
    else if (text.length < 2){
        return {ok: false, reason: 'text is not enough!'}
    }
    else{
        return {ok: true, reason: 'Everything Looks Good!'};
    }
})

app.on('ready', createWindow);

app.on('window-all-closed', ()=>{
    if (process.platform !=='darwin'){
        app.quit()
    }
})