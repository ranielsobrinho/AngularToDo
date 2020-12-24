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
    this.todos.push(new Todo(1, 'Passear com o cachorro', false));
    this.todos.push(new Todo(2, 'Ir ao supermercado', false));
    this.todos.push(new Todo(3, 'Cortar o cabelo', true));

  }

  // tslint:disable-next-line: typedef
  remove(todo: Todo){
    const index = this.todos.indexOf(todo);
    if (index !== -1){
      this.todos.splice(index, 1); // Aqui recebe o index e depois apaga
    }
  }

  // tslint:disable-next-line: typedef
  markAsDone(todo: Todo){
    todo.done = true;
  }

  // tslint:disable-next-line: typedef
  markAsUndone(todo: Todo){
    todo.done = false;
  }

}
