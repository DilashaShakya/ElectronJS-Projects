// const {app, BrowserWindow, ipcMain} = require("electron")
const electron = require("electron")
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const ipc = electron.ipcMain
const path = require("path")
const url = require("url");
const fs = require('fs');
const dialog = electron.dialog;


let win;

function createWindow(){
    win = new BrowserWindow({
        width: 800, 
        height: 700,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
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

ipc.handle('create-file', async (event, fileName, contents, folderPath )=>{
    try{
        //build file path
        const filePath = path.join(folderPath, fileName);

        //write text to file
        fs.writeFileSync(filePath, contents, 'utf-8');

        //return result to renderer
        return {success: true, message:'Created file!'};
    }
    catch(err){
        return {success: false, message: err.message};

    }
})

ipc.handle('read-file', async(event, fileName, folderPath)=>{
    try{
        //build file path
        const filePath = path.join(folderPath, fileName);
        
        //check if it exists
        if (!fs.existsSync(filePath)){
            return {success:false, message:'File does not exist.'}
        }

        const data = fs.readFileSync(filePath, 'utf-8');
        return {success:true, data, message: 'File Loaded.'};
    }
    catch(err){
        return {success: false, message: err.message};
    }
})


ipc.handle('delete-file', async(event, fileName, folderPath)=>{
   try{
        //build file path
        const filePath = path.join(folderPath, fileName);
        
        //check if it exists
        if (!fs.existsSync(filePath)){
            return {success:false, message:'File does not exist.'}
        }

        fs.unlinkSync(filePath);
            return { success: true, message: "File deleted." };
        } catch (err) {
            return { success: false, message: err.message };
        }
})

ipc.handle('select-folder', async(event)=>{
    const result = await dialog.showOpenDialog(win, {
        properties: ['openDirectory'],
    }); //win attached to browser window

    if (result.canceled) return null;
    return result.filePaths[0]; //selected folder path
})


//success error messages
ipc.handle('error-message', async (event, message)=>{
    dialog.showErrorBox("Error", message);
})

ipc.handle("show-success", (event, message) => {
  dialog.showMessageBox(win, { message });
});


app.on('ready', createWindow);

app.on('window-all-closed', ()=>{
    if (process.platform !=='darwin'){
        app.quit()
    }
})