import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodosService } from 'src/app/shared/todos.service';
import { Todo } from 'src/models/todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  public form: FormGroup;
  public todos: Todo[] = new Array<Todo>();

  constructor(private fb: FormBuilder,
              private todosService: TodosService) {
                this.form = this.fb.group({
                  title: ['', Validators.compose([
                    Validators.minLength(3),
                    Validators.maxLength(90),
                    Validators.required
                  ])]
                });
              }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit(): void {
    // Return all todos from the TodoService
    this.todos = this.todosService.getAll();
  }

  addTodo(): any{
    const title = this.form.controls.title.value;
    this.todosService.add(title);
    this.todosService.showMessage('Adicionado nova tarefa!');
    this.form.reset();
  }
}
