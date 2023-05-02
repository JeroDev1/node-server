const readline = require('readline');
//readline lo uso para leer una entrada desde el terminal
const rl = readline.createInterface({
  input: process.stdin, //escucha la entrada del usuario en node
  output: process.stdout //lee la salida del usuario en node
});
// creo el array vacio donde almeceno las tareas
let tasks = [];

//primera funcion de agregar tareas utilizando question y push para ser enviada
function addTask() {
  rl.question('Introduce una tarea: ', (description) => {
    tasks.push({
      id: tasks.length + 1,
      description,
      completed: false
    });
    console.log('Tarea añadida');
    showTasks();
    askForAction();
  });
}


//funcion para eliminar tarea usando el id para realizar la eliminacion y el filter para encontrala
function deleteTask() {
  rl.question('Introduce el número de la tarea que quieres eliminar: ', (id) => {
    tasks = tasks.filter(task => task.id !== parseInt(id));
    console.log('Tarea eliminada');
    showTasks();
    askForAction();
  });
}


// esta es la funcion para completar tarea, askForAction pregunta al usuariola accion y showTasks muestra las tareas en consola
function completeTask() {
  rl.question('Introduce el número de la tarea que quieres marcar como completada: ', (id) => {
    tasks = tasks.map(task => {
      if (task.id === parseInt(id)) {
        return {
          ...task,
          completed: true
        };//... pasa un array a una lista de argumentos
      } else {
        return task;
      }
    });
    console.log('Tarea completada');
    showTasks();
    askForAction();
  });
}

// forEach ejecuta la función indicada una vez por cada elemento del array.
function showTasks() {
  console.log('Lista de tareas:');
  tasks.forEach(task => {
    console.log(`${task.id}. [${task.completed ? 'X' : ' '}] ${task.description}`);
  });
}

// swatich para validar que proceso se debe realizar 
function askForAction() {
  rl.question('¿Qué acción quieres realizar? (añadir, eliminar, completar, salir): ', (answer) => {
    switch(answer.toLowerCase()) {
      case 'añadir':
        addTask();
        break;
      case 'eliminar':
        deleteTask();
        break;
      case 'completar':
        completeTask();
        break;
      case 'salir':
        rl.close();
        break;
      default:
        console.log('Acción no válida');
        askForAction();
    }
  });
}

askForAction();