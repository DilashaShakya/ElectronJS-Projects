const electron = require("electron")
const app = electron.app
const path = require("path")
const url = require("url")
const Tray = electron.Tray
const iconPath = path.join(__dirname,'owl.png' )

const Menu = electron.Menu

let tray = null;

app.on('ready', function(){
    // Create the tray icon
    tray = new Tray(iconPath);

    // Define the context menu template
    let template = [
        {
            'label': 'Audio',
            submenu:[
                {
                    label: 'Low',
                    type: 'radio',
                    checked: true
                },
                {
                    label: 'High',
                    type: 'radio',
                }
            ]
        },
        {
         'label': 'Video',
         submenu: [
            {
                label: '1280x720',
                type: 'radio',
                checked: true
            },
            {
                label: '1920x1080',
                type: 'radio'
            }
         ]   
        }
    ];

    // Build the context menu from template and set it
    const ctxMenu = Menu.buildFromTemplate(template);
    tray.setContextMenu(ctxMenu);
    tray.setToolTip('Tray Application')
});

app.on('window-all-closed', ()=>{
    if (process.platform !== 'darwin'){
        app.quit()
    }
});

