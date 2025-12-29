const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require("path");
const url = require("url");
const ipc = electron.ipcMain;
const dialog = electron.dialog;

let win;
function createWindow(){
    win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
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
ipc.handle("select-folder", async()=>{
    const result = await dialog.showOpenDialog(win, {
        properties:["openDirectory"]
    })

    if (result.canceled) return null;
    return result.filePaths[0];
})
app.on('ready', createWindow);

app.on('window-all-closed', ()=>{
    if (process.platform !=='darwin'){
        app.quit()
    }
})