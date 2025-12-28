const electron = require ("electron")
const ipc = electron.ipcRenderer

const asyncBtn = document.getElementById('asyncBtn')
const syncBtn = document.getElementById('syncBtn')

asyncBtn.addEventListener('click', function(){
    console.log('async message 1')
    ipc.send('async-message')
    console.log('async message 2')
})

syncBtn.addEventListener('click', function(){
    console.log('sync message 1')
    const reply = ipc.sendSync('sync-message')
    console.log(reply)
    console.log('sync message 2')
})

ipc.on('opened-async-message', function(event, arg){
    console.log(arg)
})