import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-task-list',
  standalone: true,
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  imports: [CommonModule, FormsModule, HttpClientModule]
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  newTaskTitle: string = '';
  newTaskDescription: string = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  // Cargar todas las tareas
  loadTasks(): void {
    this.taskService.getTasks().subscribe(
      (data: any) => {
        this.tasks = data;
      },
      (error) => {
        console.error('Error al cargar las tareas:', error);
      }
    );
  }

  // Agregar una tarea
  addTask(): void {
    if (this.newTaskTitle) {
      const task = { title: this.newTaskTitle, description: this.newTaskDescription };
      this.taskService.addTask(task).subscribe(
        (newTask: any) => {
          this.tasks.push(newTask);
          this.newTaskTitle = '';
          this.newTaskDescription = '';
        },
        (error) => {
          console.error('Error al agregar la tarea:', error);
        }
      );
    }
  }

  // Alternar el estado de completado de una tarea
  toggleCompletion(task: any): void {
    task.completed = !task.completed;
    this.taskService.updateTask(task._id, { completed: task.completed }).subscribe(
      () => {
        // Puedes agregar lógica adicional si es necesario.
      },
      (error) => {
        console.error('Error al actualizar el estado de la tarea:', error);
      }
    );
  }

  // Eliminar una tarea
  deleteTask(taskId: string): void {
    this.taskService.deleteTask(taskId).subscribe(
      () => {
        this.tasks = this.tasks.filter(task => task._id !== taskId);
      },
      (error) => {
        console.error('Error al eliminar la tarea:', error);
      }
    );
  }
}
