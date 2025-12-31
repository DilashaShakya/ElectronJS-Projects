const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path')
const url = require('url')
const ipc = electron.ipcMain
const fs = require('fs')
const dialog = electron.dialog


let win;

function createWindow () {

  win = new BrowserWindow({width: 800, height: 600})

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));


  win.on('closed', () => {
    win = null
  });
}

// IPC Handlers for file operations
ipc.handle('create-file', async (event, fileName, contents, folderPath) => {
    try {
        const filePath = path.join(folderPath, fileName)
        fs.writeFileSync(filePath, contents, 'utf8')
        return { success: true, message: 'File was created' }
    } catch (err) {
        return { success: false, message: err.message }
    }
})

ipc.handle('read-file', async (event, fileName, folderPath) => {
    try {
        const filePath = path.join(folderPath, fileName)
        if (!fs.existsSync(filePath)) {
            return { success: false, message: 'File does not exist' }
        }
        const data = fs.readFileSync(filePath, 'utf8')
        return { success: true, data: data, message: 'File has been loaded' }
    } catch (err) {
        return { success: false, message: err.message }
    }
})

ipc.handle('delete-file', async (event, fileName, folderPath) => {
    try {
        const filePath = path.join(folderPath, fileName)
        if (!fs.existsSync(filePath)) {
            return { success: false, message: 'File does not exist' }
        }
        fs.unlinkSync(filePath)
        return { success: true, message: 'File has been deleted' }
    } catch (err) {
        return { success: false, message: err.message }
    }
})

// Dialog handlers
ipc.handle('show-error', async (event, message) => {
    await dialog.showErrorBox('Error', message)
})

ipc.handle('show-success', async (event, message) => {
    await dialog.showMessageBox(win, {
        type: 'info',
        title: 'Success',
        message: message,
        buttons: ['OK']
    })
})

ipc.handle('select-folder', async () => {
    const result = await dialog.showOpenDialog(win, {
        properties: ['openDirectory']
    })
    if (result.canceled) return null
    return result.filePaths[0]
})

app.on('ready', createWindow);


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});