import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/taskservice.service';
import { AppComponent } from 'src/app/app.component';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-crear-tarea',
  templateUrl: './crear-tarea.component.html',
  styleUrls: ['./crear-tarea.component.css']
})
export class CrearTareaComponent implements OnInit {
  task: any = {
    title: '',
    details: '',
    dueDate: '',
    priority: 'alta' // Puedes establecer la prioridad por defecto aquí
  };
  tareaCreada: boolean = false;
  tareaParaEditar: any = null; // Inicialmente, no estás editando una tarea existente




  constructor(private taskService: TaskService, private appComponent: AppComponent, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const taskId = params['taskId'];

      if (taskId) {
        // Cargar los datos de la tarea a editar
        this.loadTaskForEditing(taskId);
      }
    });
  }


  loadTaskForEditing(taskId: string) {
    this.taskService.getTaskById(taskId).subscribe(
      (response) => {
        this.tareaParaEditar = response;
        this.task = { ...response }; // Copia los datos de la tarea a editar al formulario
      },
      (error) => {
        console.error('Error al cargar los datos de la tarea para edición', error);
      }
    );
  }


  // Esta función se llamará cuando ocurra un cambio en los campos del formulario
  isFormValid(): boolean {
    return this.task.title && this.task.details && this.task.dueDate && this.task.priority;

  }


  onSubmit() {
    const userId = this.appComponent.getUserID();

    if (userId !== null) {
      if (this.tareaParaEditar) {
        // Estás actualizando una tarea existente
        this.taskService.actualizarTarea(this.tareaParaEditar._id, this.task).subscribe(
          (response) => {
            console.log('Tarea actualizada exitosamente', response);
            // Actualiza la tarea en la lista de tareas o realiza cualquier otra acción necesaria
          },
          (error) => {
            console.error('Error al actualizar la tarea', error);
            // Manejar errores aquí
          }
        );
      } else {
        // Estás creando una nueva tarea
        this.taskService.createTask(userId, this.task).subscribe(
          (response) => {
            console.log('Tarea creada exitosamente', response);
            // Realiza cualquier acción necesaria para la creación de una nueva tarea
          },
          (error) => {
            console.error('Error al crear la tarea', error);
            // Manejar errores aquí
          }
        );
      }
    } else {
      console.error('El userId es nulo. No se puede crear ni actualizar la tarea sin un userId válido.');
    }
  }

}
