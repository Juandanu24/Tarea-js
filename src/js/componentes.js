import {Todo} from '../classes';
import {todoList} from '../index'

//Referencias en el html

const divTodoList        = document.querySelector('.todo-list');
const txtInput           = document.querySelector('.new-todo');
const borrarCompletado   = document.querySelector('.clear-completed');
const ulFilter           = document.querySelector('.filters');
const cuadroSeleccionado = document.querySelectorAll('.filtro');


export const crearTodoHtml = (todo) => {

    const htmlTodo = `
        <li class="${(todo.completado)? 'completed' : ''  }" data-id=" ${ todo.id } ">
            <div class="view">
                <input class="toggle" type="checkbox" ${(todo.completado) ? 'checked' : ''}>
                <label>${todo.tarea}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template">
        </li>`;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild);

    return div.firstElementChild;
}

// Eventos--------------------------------------

//Agregar Todo

txtInput.addEventListener('keyup', (evento)=>{

    if( evento.keyCode === 13 && txtInput.value.length >0){
        const nuevoTodo = new Todo(txtInput.value);
        todoList.nuevoTodo (nuevoTodo);
        
        crearTodoHtml(nuevoTodo);
        txtInput.value = '';
    }
    
})


//Marcar elemento, borrar elemento

divTodoList.addEventListener('click', (evento)=>{

    const nombreElemento = evento.target.localName; //Input, label, button 
    const todoElemento   = evento.target.parentElement.parentElement;
    const todoId     = todoElemento.getAttribute('data-id');

    if(nombreElemento.includes('input')){ //Click en el check

        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed')

        
    } else if(nombreElemento.includes('button')){ //Borra elemento de la lista

        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento);

    } 
})

// Eliminar completados 

borrarCompletado.addEventListener('click', ()=>{

    todoList.eliminarCompletado();

    for( let i = divTodoList.children.length -1; i >= 0 ; i--){

        const element = divTodoList.children[i];

        if( element.classList.contains('completed')){
            divTodoList.removeChild(element);
        }
    }

})


//Filtrar

ulFilter.addEventListener('click', (event)=>{

    const filtro = event.target.text;
    if( !filtro ) { return; };

    cuadroSeleccionado.forEach( elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');


    for(const elemento of divTodoList.children){
        
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch(filtro){
            case 'Pendientes':
                if(completado){
                    elemento.classList.add('hidden');
                }
            break;

            case 'Completados':
                if(!completado){
                    elemento.classList.add('hidden');
                }
            break;
        }
    }
})
