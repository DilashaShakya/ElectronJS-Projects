const chrome = document.getElementById("chrome");
const node = document.getElementById("node");
const electron = document.getElementById("electron");
// const btn = document.getElementById("btn")
const subBtn = document.getElementById("submit-button")
const inputArea = document.getElementById("text-area")


// btn.addEventListener('click', () => {
//     window.api.sayHello()
// });

chrome.innerHTML += " " + versions.chrome();
node.innerHTML += " " + versions.node();
electron.innerHTML += " " + versions.electron();

subBtn.addEventListener('click', ()=>{
    const url = inputArea.value
    if (url.trim !== ''){
        window.openNewWindow.openNewUrl(url)
    }

})