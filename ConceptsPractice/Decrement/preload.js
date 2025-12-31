const {contextBridge, ipcRenderer} = require("electron");

contextBridge.exposeInMainWorld('decreaseAPI',{
    decrementingNum:(number)=>{
        return ipcRenderer.invoke('decrementNum',number )
    }
});