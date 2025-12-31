const vBtn = document.getElementById('btn');
const response = document.getElementById('resp')
const txt = document.getElementById('text-area')

vBtn.addEventListener('click', async()=>{
    const text = txt.value;
    const result = await window.validateAPI.validation(text);

    response.textContent = result.reason;

})