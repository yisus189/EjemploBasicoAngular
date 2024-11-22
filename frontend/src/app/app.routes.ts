import { Routes } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';

export const routes: Routes = [
    {path: '', component: TaskListComponent},
    { path: '**', redirectTo: '', pathMatch: 'full' }
];