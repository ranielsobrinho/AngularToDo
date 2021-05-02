import { Injectable } from '@angular/core';

import { Todo } from 'src/models/todo.model';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  public todos: Todo[] = [];
  constructor(private snackBar: MatSnackBar) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }

  getAll(): any{
    return this.load();
  }

  get(id: number): any{
    return this.todos[id];
  }

  add(title: string): any {
    const newLenght = this.todos.push(new Todo(title, false));
    const index = newLenght - 1;
    this.save();
    return index;
  }

  remove(id: number): void{
      this.todos.splice(id, 1); // Get the index e then delete
      this.save();
  }

  update(id: number, title: string): any{
    const todo = this.todos[id];
    todo.title = title;
    this.save();
  }

  done(id: number): void{
    const todo = this.todos[id];
    todo.done = true;
    this.save();
  }

  undone(id: number): void{
    const todo = this.todos[id];
    todo.done = false;
    this.save();
  }

  save(): void{
    const data = JSON.stringify(this.todos);
    localStorage.setItem('todos', data);
    // You can use removeItem to remove an item and clear to remove everything
  }

  load(): any{
    const data = localStorage.getItem('todos');
    if (data) {
      return this.todos = JSON.parse(data);
    } else {
      return this.todos = [];
    }
  }
}
