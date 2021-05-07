import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { TodoListComponent } from './pages/todo-list/todo-list.component';

const routes: Routes = [
  {path: '', component: MainLayoutComponent, children: [
    {path: '', component: TodoListComponent}
  ]},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [MainLayoutComponent, TodoListComponent];
