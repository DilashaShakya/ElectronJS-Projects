const Btn = document.getElementById("btn");
const Show = document.getElementById('show-on-screen')


window.sendAPI.onReply((message)=>{
    Show.textContent = message
})

Btn.addEventListener('click',()=>{
    window.sendAPI.sendHello();
})