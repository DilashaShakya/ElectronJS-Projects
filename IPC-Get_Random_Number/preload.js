const {contextBridge, ipcRenderer} = require("electron");

contextBridge.exposeInMainWorld('randomNumAPI', {
    generateNum:()=>{
        return ipcRenderer.invoke('get-random' )
    }
})