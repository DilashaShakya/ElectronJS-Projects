const {contextBridge, ipcRenderer} = require("electron")

contextBridge.exposeInMainWorld('sendAPI', {
    sendHello:()=>{
        ipcRenderer.send("send-text")
    },
    onReply:(callback)=>{
        //listen for reply from main
        ipcRenderer.on('message-reply', (event, message)=>{
            callback(message);
        })
    }
})

//notes
//ipcRenderer.send() - Sending a message (outgoing)

// Sends a message to the main process
// One-way communication (fire and forget)
// No response expected immediately
// Used when you want to tell main process something


//ipcRenderer.on() - Listening for a message (incoming)

// Listens for messages FROM the main process
// Requires a callback function to handle the message
// Used when you want to receive something