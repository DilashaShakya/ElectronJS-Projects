const openBtn = document.getElementById('openBtn')
const electron = require('electron')
const shell = electron.shell
const path = require('path')

openBtn.addEventListener("click", async () => {
  shell.showItemInFolder("C:\\Electron\\demo.txt");

  const result = await shell.openPath("C:\Electron\\picture_dilasha_.jpg");
  if (result) console.error("Failed to open:", result);
  shell.openExternal('http://electron.atom.io')
});
