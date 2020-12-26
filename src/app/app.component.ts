import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public todos: Todo[] = []; // pegando a classe todo.model.ts
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
  }

  add(): void {
    const title = this.form.controls.title.value;
    const id = this.todos.length + 1;
    this.todos.push(new Todo(id, title, false));
    this.clear();
  }

  clear(): void {
    this.form.reset();
  }

  remove(todo: Todo): void{
    const index = this.todos.indexOf(todo);
    if (index !== -1){
      this.todos.splice(index, 1); // Aqui recebe o index e depois apaga
    }
  }

  markAsDone(todo: Todo): void{
    todo.done = true;
  }

  markAsUndone(todo: Todo): void{
    todo.done = false;
  }

}
