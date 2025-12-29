const electron = require("electron")
const app = electron.app
const path = require("path")
const url = require("url")
const BrowserWindow = electron.BrowserWindow

const Menu = electron.Menu
const MenuItem = electron.MenuItem
const globalShortcut = electron.globalShortcut
let win;

function createWindow(){
    win = new BrowserWindow()

    win.loadURL(url.format({
        pathname:path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes:true
    }))
}

app.on('closed', ()=>{
    win = null
});

app.on('ready', function(){
    createWindow()
    const template = [
        {
            label: 'Edit',
            submenu: [
                // already implemented by electron
                    {role: 'undo'},
                    {role: 'redo'},
                    {type: 'separator'},
                    {role:'cut'},
                    {role: 'copy'},
                    {role: 'paste'},
                    {role: 'pasteandmatchstyle'},
                    {role: 'delete'},
                    {role: 'selectall'}
                
            ]
        },
        {
            label: 'demo',
            submenu: [
                {
                    label: 'submenu1',
                    click: function(){
                        console.log("Clicked submenu1 ")
                    }
                },
                {
                    type:'separator'
                },
                {
                    label: 'submenu2'
                }
            ]
        },
        {
            label: 'Help',
            submenu:[
                {
                    label: 'About electron',
                    click: function(){
                        electron.shell.openExternal('http://electron.atom.io')
                    },
                    accelerator: 'CmdOrCtrl + Shift + H'
                }
            ],
            click: function(){
                electron.shell.openExternal('http://electron.atom.io')
            }
        }
    ]
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)

    const ctxMenu = new Menu()
    ctxMenu.append(new MenuItem({
        label: 'Hello',
        click: function(){
            console.log('context menu item clicked.')
        }
    }))
    ctxMenu.append(new MenuItem({role: 'selectAll'}))
    //event handler that takes position of mouse and shows a popup there
    win.webContents.on('context-menu', function(e, params){
        ctxMenu.popup(win, params.x, params.y)
    })

    globalShortcut.register('Alt + 1', function(){
        win.show()
    })
});
app.on('will-quit', function(){
    globalShortcut.unregisterAll()
})
app.on('window-all-closed', ()=>{
    if (process.platform !== 'darwin'){
        app.quit()
    }
});

