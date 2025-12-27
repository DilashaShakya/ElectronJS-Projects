console.log("main js working")
const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require("path");
const url = require("url");
const { ipcMain } = electron;

let winone, winTwo;
function createWindow(){
    winone = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    winTwo = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    winone.loadURL(url.format({
        pathname: path.join(__dirname, 'one.html'),
        protocol:'file',
        slashes: true
    }))

    winTwo.loadURL(url.format({
        pathname: path.join(__dirname, 'two.html'),
        protocol:'file',
        slashes: true
    }))

    winone.webContents.openDevTools();
    winTwo.webContents.openDevTools();
    winone.on('closed', ()=> {
        win=null;
    })
    winTwo.on('closed', ()=> {
        win=null;
    })
}

app.on('ready', createWindow);

app.on('window-all-closed', ()=>{
    if (process.platform !=='darwin'){
        app.quit()
    }
})

// IPC handler to create a new window
ipcMain.on('create-new-window', (event) => {
    let winThree = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    winThree.loadURL(url.format({
        pathname: path.join(__dirname, 'three.html'),
        protocol: 'file',
        slashes: true
    }));
    winThree.webContents.openDevTools();
    winThree.on('closed', () => {
        winThree = null;
    });
});