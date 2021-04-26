import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodosService } from 'src/app/shared/todos.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  public form: FormGroup;

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
  addTodo(): any{
    const title = this.form.controls.title.value;
    this.todosService.add(title);
    this.form.reset();
  }
}
