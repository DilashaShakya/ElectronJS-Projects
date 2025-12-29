const fs = require('fs')
const path = require('path')
const electron = require('electron')
const ipcRenderer = electron.ipcRenderer

btnCreate = document.getElementById('btnCreate')
btnRead = document.getElementById('btnRead')
btnDelete = document.getElementById('btnDelete')
btnSelectFolder = document.getElementById('btnSelectFolder')
fileName = document.getElementById('fileName')
fileContents = document.getElementById('fileContents')

let pathname = path.join(__dirname, 'Files')

// Create Files directory if it doesn't exist
if (!fs.existsSync(pathname)) {
    fs.mkdirSync(pathname, { recursive: true })
}

// Helper functions for messages
function showError(message) {
    alert('Error: ' + message)
    console.error(message)
}

function showSuccess(message) {
    alert('Success: ' + message)
    console.log(message)
}

//WRITE
btnCreate.addEventListener('click', function (){
    if (!fileName.value.trim()) return showError("Please enter a file name. ");

    let file = path.join(pathname, fileName.value)
    let contents = fileContents.value

    fs.writeFile(file, contents, function(err){
        if (err){
            return showError(err.message)
        }
        showSuccess("File was created");
    })
})

//READ
btnRead.addEventListener('click', function(){
    if (!fileName.value.trim()) return showError("Please enter a file name.");
    let file = path.join(pathname, fileName.value)
    fs.readFile(file, 'utf8', function(err, data){
        if (err){
            return showError(err.message)
        }
        fileContents.value = data
        showSuccess("File has been loaded.");
    })
})

//DELETE
btnDelete.addEventListener('click', function(){
    if (!fileName.value.trim()) {
        return showError('Please enter a file name')
    }
    
    let file = path.join(pathname, fileName.value)
    
    fs.unlink(file, function(err){
        if (err){
            return showError(err.message)
        }
        fileName.value = ''
        fileContents.value =''
        showSuccess("File has been deleted!");
    })
})

// Select folder button
btnSelectFolder.addEventListener('click', async function() {
    try {
        const folderPath = await ipcRenderer.invoke('select-folder')
        if (folderPath) {
            //  pathname to use the selected folder
            pathname = folderPath
            showSuccess('Selected folder: ' + folderPath)
            console.log('Selected folder:', folderPath)
            console.log('Files will now be saved to:', pathname)
        } else {
            console.log('Folder selection was cancelled')
        }
    } catch (err) {
        showError('Error selecting folder: ' + err.message)
    }
})