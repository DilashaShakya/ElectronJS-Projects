const {contextBridge, ipcRenderer} = require("electron")

contextBridge.exposeInMainWorld("openFileApi",{
    fileOpen: ()=>{
        return ipcRenderer.invoke("open-file")
    }
})