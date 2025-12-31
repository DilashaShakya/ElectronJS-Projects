

const btn = document.getElementById("generate-num")
const response = document.getElementById("num")

btn.addEventListener('click', async()=>{
    const number = await window.randomNumAPI.generateNum();
    response.textContent = number;
})