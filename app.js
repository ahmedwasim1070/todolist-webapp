const insertBar=document.querySelector('input')
const insertBtn=document.getElementById('add-task')
const resBar=document.getElementById('result-bar')
const chkboxSvg='<svg id="checkbox" width="48px" height="48px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="Interface / Checkbox_Unchecked"><path id="Vector" d="M4 7.2002V16.8002C4 17.9203 4 18.4801 4.21799 18.9079C4.40973 19.2842 4.71547 19.5905 5.0918 19.7822C5.5192 20 6.07899 20 7.19691 20H16.8031C17.921 20 18.48 20 18.9074 19.7822C19.2837 19.5905 19.5905 19.2842 19.7822 18.9079C20 18.4805 20 17.9215 20 16.8036V7.19691C20 6.07899 20 5.5192 19.7822 5.0918C19.5905 4.71547 19.2837 4.40973 18.9074 4.21799C18.4796 4 17.9203 4 16.8002 4H7.2002C6.08009 4 5.51962 4 5.0918 4.21799C4.71547 4.40973 4.40973 4.71547 4.21799 5.0918C4 5.51962 4 6.08009 4 7.2002Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g></svg>'
const chkdboxSvg='<svg id="checkedbox" width="48px" height="48px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="Interface / Checkbox_Check"><path id="Vector" d="M8 12L11 15L16 9M4 16.8002V7.2002C4 6.08009 4 5.51962 4.21799 5.0918C4.40973 4.71547 4.71547 4.40973 5.0918 4.21799C5.51962 4 6.08009 4 7.2002 4H16.8002C17.9203 4 18.4796 4 18.9074 4.21799C19.2837 4.40973 19.5905 4.71547 19.7822 5.0918C20 5.5192 20 6.07899 20 7.19691V16.8036C20 17.9215 20 18.4805 19.7822 18.9079C19.5905 19.2842 19.2837 19.5905 18.9074 19.7822C18.48 20 17.921 20 16.8031 20H7.19691C6.07899 20 5.5192 20 5.0918 19.7822C4.71547 19.5905 4.40973 19.2842 4.21799 18.9079C4 18.4801 4 17.9203 4 16.8002Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g></svg>'
const rmvboxSvg='<svg width="42px" height="42px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M23 4C23 2.34315 21.6569 1 20 1H4C2.34315 1 1 2.34315 1 4V20C1 21.6569 2.34315 23 4 23H20C21.6569 23 23 21.6569 23 20V4ZM21 4C21 3.44772 20.5523 3 20 3H4C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21H20C20.5523 21 21 20.5523 21 20V4Z" fill="#0F0F0F"/><path d="M16 11C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H8C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11H16Z" fill="#0F0F0F"/></svg>'

function saveTask(){
    localStorage.setItem('tasks',resBar.innerHTML)
}
function loadTask(){
    const savedContent=localStorage.getItem('tasks')
    if (savedContent){
        resBar.innerHTML=savedContent
        reattachListners()
    }
}

function reattachListners(){
    const rmvButtons=document.querySelectorAll('.rmv-container')
    const chkButtons=document.querySelectorAll('.chk-container')
    rmvButtons.forEach(rmvBtn=>{
        rmvBtn.addEventListener('click',()=>{
            resBar.firstChild.remove()
            saveTask()
        })
    })
    chkButtons.forEach(chkBtn=>{
        chkBtn.addEventListener('click',(e)=>{
            const taskTexts=document.querySelectorAll('.task-container')
            if(e.target && e.target.id==='checkbox'){
                chkBtn.innerHTML=chkdboxSvg
                chkBtn.nextSibling.style.textDecoration='line-through'
            }else{
                chkBtn.innerHTML=chkboxSvg
                chkBtn.nextSibling.style.textDecoration='none'
            }
            saveTask()
        })
    })
}

window.addEventListener('load',loadTask)

insertBtn.addEventListener('click',()=>{
    if(insertBar.value!==""){
        const taskList=document.createElement('li')
        const chkBtn=document.createElement('div')
        const taskText=document.createElement('div')
        const rmvBtn=document.createElement('div')

        taskList.appendChild(chkBtn)
        taskList.appendChild(taskText)
        taskList.appendChild(rmvBtn)

        chkBtn.innerHTML=chkboxSvg
        taskText.innerText=insertBar.value
        rmvBtn.innerHTML=rmvboxSvg

        chkBtn.classList.add('chk-container')
        taskText.classList.add('task-container')
        rmvBtn.classList.add('rmv-container')

        rmvBtn.addEventListener('click',()=>{
            taskList.remove()
            saveTask()
        })

        chkBtn.addEventListener('click',(e)=>{
            if(e.target&&e.target.id==='checkbox'){
                chkBtn.innerHTML=chkdboxSvg
                taskText.style.textDecoration='line-through'
            }else if(e.target&&e.target.id==='checkedbox'){
                chkBtn.innerHTML=chkboxSvg
                taskText.style.textDecoration='none'
            }
            saveTask()
        })
        resBar.appendChild(taskList)
        saveTask();

        insertBar.value=""
    }
})

insertBar.addEventListener('keydown',(event)=>{
    if(event.key==='Enter'|| event.keyCode===13){
        insertBtn.click()
    }
})