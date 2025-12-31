const button = document.getElementById("btn")
const texts = document.getElementById("text-area")
const pastedElement = document.getElementById("pasted")

button.addEventListener('click', async ()=>{
    const txt = texts.value;
    if (txt.trim() !== ""){
        const receivedText = await window.sendTextAPI.sendingText(txt);
        pastedElement.textContent = receivedText;
    }
})