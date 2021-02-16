const inputText = document.getElementById('inputText');
const btnInluir = document.getElementById('btnIncluir');
const btnEscuchar = document.getElementById('btnEscuchar');
const todoListContainer = document.querySelector('.tasks');
let numTask=Number();
let rec = undefined;
btnEscuchar.addEventListener('click',parlante)

class Task{
    constructor(itemContent){
        this.crearTarea(itemContent)
    }

    crearTarea(itemContent){
        let taskContainer = document.createElement('div');

        let textTask = document.createElement('input');
        textTask.disabled = true;
        textTask.classList.add('rounded','border','col-8');
        textTask.type= 'text';
        textTask.value = itemContent;

         //configuracion del boton de editar
         let btnEdit = document.createElement('button');
         btnEdit.classList.add('btn', 'btn-warning', 'text-white','mx-1','my-1');
         let iconEdit = document.createElement('i');
         iconEdit.classList.add('far', 'fa-edit');
         btnEdit.appendChild(iconEdit);
        
         //Configuracion del boton de voz
         let btnVoz = document.createElement('button');
         btnVoz.classList.add('btn', 'btn-success','mx-1','my-1');
         let iconVoz = document.createElement('i');
         iconVoz.classList.add('fas', 'fa-check');
         btnVoz.appendChild(iconVoz);
         
        //Configuracion del boton de eliminar
        let btnDelete = document.createElement('i');
        btnDelete.classList.add('btn', 'btn-danger','mx-1','my-1');
        let iconDelete = document.createElement('i');
        iconDelete.classList.add('fas','fa-trash-alt');
        btnDelete.appendChild(iconDelete);
        

        //Uniendo todos los elementos del task dentro de su contenedor
        todoListContainer.appendChild(taskContainer)
        taskContainer.appendChild(textTask)
        taskContainer.appendChild(btnEdit)
        taskContainer.appendChild(btnVoz)
        taskContainer.appendChild(btnDelete)
        btnDelete.addEventListener('click',()=>this.Remove(taskContainer))
        numTask++
      
    }
   
    //Funcion para eliminar las tareas
    Remove(item){
        todoListContainer.removeChild(item)
        numTask--
    }
}

const iniciar = (e)=>{
    let index = e.resultIndex;
    let contenido = e.results[index][0].transcript
    console.log(contenido)
    console.log(e)
    inputText.value = contenido;
    console.log('esto funciona')

}

  function parlante(){
        if(!(webkitSpeechRecognition)in window){
            alert('usted no puede usar la api')
        }else{
            alert('usted puede usar la api')
            rec = new webkitSpeechRecognition();
            rec.lan= 'es-ES';
            rec.continuous = false;
            rec.interimResults = true;
            rec.onresult = (e)=>{iniciar(e)}
            rec.start();

            //rec.onspeechend = (e)=>{terminar(e)}

           
           

        }
    }

    const agregarTarea = ()=>{
            if(!inputText.value){
                //alerta en caso de dejar el campo vacio
                Swal.fire({
                    title: 'Error!',
                    text: 'No puedes dejar vacio el campo',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                  })
                 
            }else if(numTask >= 10){
                Swal.fire({
                    title: 'Error!',
                    text: 'No seas tan ambisioso(a) solo se permite un maximo de 10 tareas',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                  })
                  
            }else{
                new Task(inputText.value);
                inputText.innerHTML='';
                console.log(numTask)
            }

    }
btnInluir.addEventListener('click',agregarTarea)

