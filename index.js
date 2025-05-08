let toDo = []

const todoList = document.getElementById('todo-list')


const savedToDo = JSON.parse(localStorage.getItem('toDoList'));
if (savedToDo) {
  toDo = savedToDo;
  addToDo();
}

function saveToLocal() {
    localStorage.setItem('toDoList', JSON.stringify(toDo));
  }

document.getElementById('todo-add')
    .addEventListener('click', function() {
        const inputValue = document.getElementById('todo-input').value
        if (inputValue.trim()) {
            const newToDo = {
                title: inputValue,
                checked: false
            }
    
            toDo.push(newToDo)
            addToDo()
        } else {
            
            alert('Введите текст задачи');
            return;
        }
       
});





function addToDo(){
    todoList.innerHTML = ''
    for (i in toDo){
        el = document.createElement('div')
        el.classList.add('todo-item')
        const status = toDo[i].checked
        if (status) {
            el.classList.add('completed');
        }

        el.setAttribute('data-id', i)
        el.innerHTML = `
            <input type="checkbox" class="todo-check" id="todo-check" ${toDo[i].checked ? 'checked' : ''}>
            <div class="todo-name">${toDo[i].title}</div>
            <div class="todo-delete"><svg viewBox="0 -0.5 21 21" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>delete [#ffffff]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-179.000000, -360.000000)" fill="#ffffff"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M130.35,216 L132.45,216 L132.45,208 L130.35,208 L130.35,216 Z M134.55,216 L136.65,216 L136.65,208 L134.55,208 L134.55,216 Z M128.25,218 L138.75,218 L138.75,206 L128.25,206 L128.25,218 Z M130.35,204 L136.65,204 L136.65,202 L130.35,202 L130.35,204 Z M138.75,204 L138.75,200 L128.25,200 L128.25,204 L123,204 L123,206 L126.15,206 L126.15,220 L140.85,220 L140.85,206 L144,206 L144,204 L138.75,204 Z" id="delete-[#ffffff]"> </path> </g> </g> </g> </g></svg></div>
        `
        
        todoList.appendChild(el)
        
    }
    saveToLocal()

}

todoList.addEventListener("click", function(event) {
    if (event.target.classList.contains("todo-check")) {
        const parent = event.target.closest(".todo-item");
        const id = parent?.dataset.id;
        if (toDo[id].checked){
            toDo[id].checked = false
        } else {
            toDo[id].checked = true
        }
        addToDo()
    }
    if (event.target.closest(".todo-delete")) {
        const parent = event.target.closest(".todo-item");
        const id = parent?.dataset.id;
        toDo.splice(id, 1);
        addToDo();
    }

});



