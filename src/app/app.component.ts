import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public todos: Todo[] = []; // getting todo.model.ts class
  public title = 'Minhas tarefas:';
  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])]
    });

    this.load();
  }

  add(): void {
    const title = this.form.controls.title.value;
    const id = this.todos.length + 1;
    this.todos.push(new Todo(id, title, false));
    this.save();
    this.clear();
  }

  clear(): void {
    this.form.reset();
  }

  remove(todo: Todo): void{
    const index = this.todos.indexOf(todo);
    if (index !== -1){
      this.todos.splice(index, 1); // Get the index e then delete
      this.save();
    }
  }

  markAsDone(todo: Todo): void{
    todo.done = true;
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
