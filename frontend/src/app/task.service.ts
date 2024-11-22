import { Injectable } from '@angular/core';
    import { HttpClient } from '@angular/common/http';
    import { Observable } from 'rxjs';

    @Injectable({
      providedIn: 'root'
    })
    export class TaskService {
      private apiUrl = 'http://localhost:4000/tasks';

      constructor(private http: HttpClient) {}

      getTasks(): Observable<any> {
        return this.http.get(this.apiUrl);
      }

      addTask(task: any): Observable<any> {
        return this.http.post(this.apiUrl, task);
      }

      updateTask(taskId: string, updatedData: any): Observable<any> {
        return this.http.put(`${this.apiUrl}/${taskId}`, updatedData);
      }

      deleteTask(taskId: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${taskId}`);
      }
    }
