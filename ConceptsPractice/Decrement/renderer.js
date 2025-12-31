const btn = document.getElementById('decrease-btn');
const nums = document.getElementById('num');

btn.addEventListener('click', async()=>{
    const currentNum = parseInt(nums.textContent);
    const newNum = await window.decreaseAPI.decrementingNum(currentNum);
    nums.textContent = newNum;  
})