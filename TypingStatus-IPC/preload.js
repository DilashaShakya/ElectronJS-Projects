const {contextBridge, ipcRenderer} = require("electron");

contextBridge.exposeInMainWorld('typeAPI', {
    sendTyping:(isTyping)=>{
        ipcRenderer.send('typing', isTyping )
    },

    typingStatus:(callback)=>{
        ipcRenderer.on('typing-status', (event, message)=>{
            callback(message);
        })

    }
})