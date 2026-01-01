const {app, BrowserWindow, Tray, Menu} = require("electron");
const path = require("path");
const url = require("url")
let win;
let tray = null;

function createWindow (){
    win = new BrowserWindow({
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



function createTray(){
    const logo = path.join(__dirname,'logo.png' )
    tray = new Tray(logo);

    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Show pomodoro',
            click: ()=>{
                if (win) win.show()
            }
        },
        {
            label: 'Hide',
            click: ()=>{
                if (win) win.hide();
            }
        },
        { type: 'separator' },
        {
            label: 'Quit',
            click: ()=>{
                app.isQuiting = true;
                app.quit();
            }
        }
    ]);

    tray.setContextMenu(contextMenu)
    tray.setToolTip('Pomodoro Timer');

    // Double-click tray icon to show/hide window
    tray.on('double-click', () => {
        if (win) {
            if (win.isVisible()) {
                win.hide();
            } else {
                win.show();
            }
        }
    });
}

app.isQuiting = false;

app.whenReady().then(()=>{
    createWindow();
    createTray();
});

// Prevent window from closing, hide to tray instead
app.on('before-quit', () => {
    app.isQuiting = true;
});