const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require("path");
const url = require("url");

let win, dimWindow, colorWindow, framlessWindow;
function createWindow(){
    // win = new BrowserWindow()
    // dimWindow = new BrowserWindow({ width: 400, height: 400, maxHeight:600, maxHeight: 600});
    // colorWindow = new BrowserWindow({backgroundColor: '#228b22'});
    // framlessWindow = new BrowserWindow({backgroundColor: '#8000000', frame: false});

    parentWindow = new BrowserWindow({title: 'Parent'})
    childWindow = new BrowserWindow({show: false, parent: parentWindow, modal: true, title: 'child'}); 
    //child window is always on top of the parent window
    // useful for accepting terms
    childWindow.loadURL('https://github.com');
    //helps avoid flicker
    childWindow.once('ready-to-show', ()=>{ 
        childWindow.show()
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', ()=>{
    if (process.platform !=='darwin'){
        app.quit()
    }
})