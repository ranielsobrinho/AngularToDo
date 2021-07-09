import { Injectable } from '@angular/core';

import { Todo } from 'src/models/todo.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  public todos: Todo[] = [];
  private readonly API = 'http://localhost:3001/todos';

  constructor(private snackBar: MatSnackBar,
              private http: HttpClient) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }

  getAll(): Observable<Todo[]>{
    return this.http.get<Todo[]>(this.API);
  }

  getById(id: number): Observable<Todo[]>{
    const url = `${this.API}/${id}`;
    return this.http.get<Todo[]>(url);
  }

  add(todo: Todo): Observable<Todo[]> {
    return this.http.post<Todo[]>(this.API, todo);
  }

  remove(id: number): void{
      this.todos.splice(id, 1); // Get the index e then delete
      this.save();
  }

  update(todo: Todo): Observable<Todo>{
    const url = `${this.API}/${todo.id}`;
    return this.http.put<Todo>(url, todo);
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
