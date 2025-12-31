const {contextBridge, ipcRenderer} = require("electron");

contextBridge.exposeInMainWorld('validateAPI', {
    validation:(text)=>{
        return ipcRenderer.invoke('validateNum', text);
    }
});