const btn = document.getElementById('increment1');

const number = document.getElementById('num')

btn.addEventListener('click', async()=>{
    const currentNum = parseInt(number.textContent)
    const newNum = await window.counterAPI.incrementNum(currentNum);
    number.textContent = newNum;
})