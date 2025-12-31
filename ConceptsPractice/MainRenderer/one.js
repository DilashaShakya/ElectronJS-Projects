console.log("from renderer 1 js working")

const { ipcRenderer } = require('electron');

const newWindowBtn = document.getElementById('newWindowBtn');
newWindowBtn.addEventListener('click', function(event){
    // Send message to main process to create a new window
    ipcRenderer.send('create-new-window');
})