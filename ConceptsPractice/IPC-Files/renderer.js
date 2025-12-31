const selectBtn = document.getElementById("select");
const filePath = document.getElementById("filepath")

selectBtn.addEventListener('click',async()=>{
    path = await openFileApi.fileOpen() 
    filePath.innerHTML += path

})