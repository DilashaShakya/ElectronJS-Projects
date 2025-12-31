const { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld("api", {
    sayHello: () => {
        ipcRenderer.send("hello");
    }
});

contextBridge.exposeInMainWorld("versions", {
    node: () =>process.versions.node,
    chrome: ()=> process.versions.chrome,
    electron: ()=>process.versions.electron
})

contextBridge.exposeInMainWorld("openNewWindow", {
    openNewUrl: (url)=>{
        ipcRenderer.send("open-url", url)
    }
})