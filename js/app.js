window.addEventListener('load', init);

let todoObjects = [];
let todoField;
let list;

/**
 * Initialize the application
 */
function init()
{
    let form = document.getElementById("todo-form");

    todoField = document.getElementById("todo-field");

    list = document.getElementById("list");

    fillFieldsFromLocalStorage();

    form.addEventListener('submit', formSubmitHandler);
    list.addEventListener('click', todoObjectClickhandler);

    fillFieldsLocalStorage()

}

function fillFieldsFromLocalStorage(){
    if (localStorage.getItem('list') !== null){
        todoField.value = localStorage.getItem('list');
    }
}

function formSubmitHandler(e){
    e.preventDefault()
    localStorage.setItem("todo-field", todoField.value)
    createToDo(todoField.value)

    todoObjects.push(todoField.value)
    localStorage.setItem('todoObjects', JSON.stringify(todoObjects))
}

function createToDo(todoValue){
    let li = document.createElement("li")
    li.innerHTML = todoValue;
    list.appendChild(li);

}

function fillFieldsLocalStorage(){
    let todoObjectString = localStorage.getItem('todoObjects');
    if(todoObjectString !== null){
        todoObjects = JSON.parse(todoObjectString);
        for (let todoObject of todoObjects){
            createToDo(todoObject)
        }
    }
}

function todoObjectClickhandler(e){
    e.preventDefault()
    //target is nodig om op 1 ding te focussen
    let clickedItem = e.target;
    if(clickedItem.nodeName !== "LI"){
        return;
    }

    let objectPosition = todoObjects.indexOf(clickedItem.innerHTML)
    todoObjects.splice(objectPosition, 1);
    localStorage.setItem('todoObjects', JSON.stringify(todoObjects))

    clickedItem.remove();
}



