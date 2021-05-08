// get todos localstorage 
let todos = localStorage.getItem("todos")
// try parse data or nill
try{
    todos = JSON.parse(todos)
    todos = todos.length ? todos : null
}catch(e){
    todos = null

}
// set defult value todos 
if (!todos){
    todos = [
        {content:"Shopping" , status : true},
        {content:"watch videos" , status : true},
        {content:"live instgram " , status : true},
    ]
    localStorage.setItem("todos" , JSON.stringify(todos) )
}
// func to creat  or update todos list in ui
function creatTodos(todos) {
    let todosList = document.querySelector("#todos-list")
    todosList.innerHTML = ""

    // creat list tag for each todo
    todos.forEach((todo,index) => {
        let li = document.createElement("li")
        li.className = "list-gp"
        let content = document.createElement("span")
        content.textContent = todo.content
        content.style.textDecoration = todo.status ? "initial" :'line-through'
        let deletBtn = document.createElement("img")
        deletBtn.src = "media/delete.png"
        deletBtn.alt = "delete icon"
        deletBtn.className = "float-right"

        // append content and delet to li
        li.append(content)
        li.append(deletBtn)
        // append li to todos list (ul)
        todosList.append(li)
        // add deleted func
        deletBtn.addEventListener("click",e=>{
            todos.splice(index , 1)
            localStorage.setItem("todos" , JSON.stringify(todos))
            creatTodos(todos)

        })
        // add complete func
            content.addEventListener("click",e=>{
            todos[index].status = !todos[index].status
            localStorage.setItem("todos" , JSON.stringify(todos))
            creatTodos(todos)
        
         })
    });
    
}
creatTodos(todos)

// action add & search
let action = document.querySelector("#actions")
let formwrapper = document.querySelector("#form-wrapper")

Array.from(actions.children).forEach(action=>{
    if (action.dataset.action == "add") {
        action.addEventListener("click" , e =>{
            formwrapper.innerHTML = `
                <form id="add">
					<input  id="add" name="add" placeholder="add todo ..." >
				</form>
            `
            let add = document.querySelector("#add")
            add.addEventListener("submit" , e =>{
            e.preventDefault()
            if (add.add.value) {
                todos.push({content : add.add.value ,status:true})
                localStorage.setItem("todos" , JSON.stringify(todos))
                creatTodos(todos)  
            }
            })
            

        })   
    } else if (action.dataset.action == "search") {
        action.addEventListener("click" , e =>{
            formwrapper.innerHTML = `
                <form>
					<input id="search"  name="search" placeholder="search todo ...">
				</form>
            `

        })
    }
})