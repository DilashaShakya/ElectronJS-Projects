const {app, BrowserWindow} = require("electron");
const path = require("path");
const url = require("url")

function createWindow (){
    const win = new BrowserWindow({
        title: 'WorkEfficiently',
        width:500,
        height: 500,
        frame: false,
        resizable: false


    });

    const startUrl = url.format({
        pathname: path.join(__dirname, '../build/index.html'), //connecting to react app
        protocol:'file',
        slashes: true,
    });

    win.loadURL(startUrl); //load app in electron window
}

app.whenReady().then(createWindow)