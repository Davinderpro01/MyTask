import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PerfilService } from 'src/app/services/perfil.service';
import { AuthService } from 'src/app/services/auth.service';
import { TaskService } from 'src/app/services/taskservice.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  perfilData: any;
  modules: any[] = [];
  isEditMode: boolean = false;
  tareas: any[] = [];

  constructor(
    private perfilService: PerfilService,
    private router: Router,
    private authService: AuthService,
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.authService.logout(); // Cerrar la sesión si no hay un token válido
      this.router.navigate(['/']);
      return;
    }

    this.loadUserProfile(token);
  }

  loadUserProfile(token: string) {
    this.perfilService.getPerfilData(token).subscribe({
      next: (response) => {
        this.perfilData = response.user;
        this.loadUserTasks(this.perfilData._id); // Carga las tareas relacionadas con el usuario
      },
      error: (error) => {
        if (error.status === 401 && error.error.message === 'Acceso no autorizado') {
          this.authService.logout(); // Utiliza el servicio para cerrar sesión
          this.router.navigate(['/']);
        }
      }
    });
  }

  loadUserTasks(userId: string) {
    this.perfilService.getTareasUsuario(userId).subscribe({
      next: (response) => {
        this.tareas = response; // Almacena las tareas relacionadas con el usuario
      },
      error: (error) => {
        console.error('Error al cargar las tareas del usuario', error);
      }
    });
  }

  eliminarTarea(taskId: string) {
    // Llama a tu servicio para eliminar la tarea por su ID.
    this.taskService.eliminarTarea(taskId).subscribe(() => {
      // La tarea se eliminó con éxito, así que debes actualizar la lista de tareas en el componente.
      window.location.reload();
    });
  }

  editarTarea(taskId: string) {
    // Redirige al componente de crear tarea y pasa el taskId como parámetro
    this.router.navigate(['/crear-tarea', taskId]);
  }

}
