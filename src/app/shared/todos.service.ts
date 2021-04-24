import { identifierModuleUrl } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Todo } from 'src/models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  public todos: Todo[] = [];
  constructor() { }

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

  markAsDone(todo: Todo): void{
    todo.done = true;
    this.save();
  }

  update(id: number, title: string): any{
    const todo = this.todos[id];
    todo.title = title;
    this.save();
  }

  markAsUndone(todo: Todo): void{
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
      this.todos = JSON.parse(data);
    } else {
      this.todos = [];
    }
  }
}
