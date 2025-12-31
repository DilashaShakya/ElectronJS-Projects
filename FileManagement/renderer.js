
const createBtn = document.getElementById("create-btn");
const deleteBtn = document.getElementById("delete-btn");
const readBtn = document.getElementById("read-btn");
const selectBtn = document.getElementById("select-btn");

//typing areas
const fileName = document.getElementById("file-name");
const contents = document.getElementById("file-contents");

const electron = require("electron");
const ipcRenderer = electron.ipcRenderer;
const path = require('path');


//default folder path

let folderPath = path.join(__dirname, 'Files');

//messages

async function showError(message) {
    console.error(message);
    await ipcRenderer.invoke('error-message', message);
    
}

async function showMessageBox(message) {
    console.log(message);
    await ipcRenderer.invoke('show-success', message);
}


//click event for CREATE
createBtn.addEventListener('click', async()=>{
    const fileNames = fileName.value.trim() ;
    const fileContent = contents.value; 

    if (!fileNames){
        await showError("File Name is missing!");
        return;
    }

    const result = await ipcRenderer.invoke("create-file", fileNames, fileContent, folderPath);
     if (result.success){
        await showMessageBox(result.message);
     }
     else{
     await showError(result.message);
     }


})

//click event for READ
readBtn.addEventListener('click', async()=>{
    const fileNames = fileName.value.trim() ;
    if (!fileNames){
        await showError("File Name is missing!");
        return;
    }

    const result = await ipcRenderer.invoke("read-file", fileNames, folderPath);
    if (result.success){
        contents.value = result.data; //putting text value in contents
        await showMessageBox(result.message);
     }
     else{
     await showError(result.message);
     }

})

//click event for delete
deleteBtn.addEventListener('click', async()=>{
    const fileNames = fileName.value.trim() ;
    if (!fileNames){
        await showError("File Name is missing!");
        return;
    }
    if (!confirm(`Delete ${fileNames}?`)) return;

    const result = await ipcRenderer.invoke('delete-file', fileNames, folderPath );
    if (result.success){
        fileName.value ='';
        contents.value = '';
        await showMessageBox(result.message);
    }
    else{
        await showError(result.message);
    }
})

//click event for select folder

selectBtn.addEventListener('click', async()=>{
    const selected = await ipcRenderer.invoke('select-folder');

    if (!selected){
        return;
    }

    folderPath = selected;
    document.getElementById("folder-label").textContent = "Saving to: " + folderPath;

    await showMessageBox("Folder has been selected!")
})