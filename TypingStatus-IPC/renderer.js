const txt = document.getElementById('text-area');
const status = document.getElementById('typing-status');

let typingTimer; 

txt.addEventListener('input',()=>{
    window.typeAPI.sendTyping(true) //shows the message
    
    clearTimeout(typingTimer);

    // After 1 second of no typing, clear the status
    typingTimer = setTimeout(() => {
        status.textContent = ''  // Clear it
    }, 1000)
}
)

window.typeAPI.typingStatus((message)=>{
    //callback function
    status.textContent = message; //shows status: typing...
})