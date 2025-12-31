const {contextBridge, ipcRenderer} = require("electron")

contextBridge.exposeInMainWorld('counterAPI',{
    incrementNum :(num)=>{
        return ipcRenderer.invoke('increment', num)
    }
})