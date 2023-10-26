import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  public baseUrl = environment.backendUrl;

  constructor(private http: HttpClient, private router: Router) { }

  createTask(userId: string, taskData: any): Observable<any> {
    const url = `${this.baseUrl}tasks`;
    return this.http.post(url, { userId, ...taskData });
  }

  eliminarTarea(taskId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}tasks/${taskId}`);
  }

  getTaskById(taskId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}tasks/${taskId}`);
  }

  actualizarTarea(taskId: string, updatedTaskData: any): Observable<any> {
    const url = `${this.baseUrl}tasks/${taskId}`;
    return this.http.put(url, updatedTaskData);
  }


}
