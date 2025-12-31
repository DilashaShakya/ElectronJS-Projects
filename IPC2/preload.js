const {contextBridge, ipcRenderer} = require ("electron")

contextBridge.exposeInMainWorld("sendTextAPI", {
    sendingText: (text)=>{
        return ipcRenderer.invoke('sendText', text)

    }
});