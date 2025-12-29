const electron = require("electron")
const app = electron.app
const path = require("path")
const url = require("url")
const BrowserWindow = electron.BrowserWindow

let win;

function createWindow(){
     win = new BrowserWindow({
         webPreferences: {
             nodeIntegration: true,
             contextIsolation: false
         }
     })

     win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
     }))

     win.webContents.openDevTools();

     win.on('closed', function(){
         win = null
     })
}

app.on('ready', createWindow)

app.on('window-all-closed', ()=>{
if (process.platform !== 'darwin'){
        app.quit()
    }
})