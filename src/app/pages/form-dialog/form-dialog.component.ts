import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TodosService } from 'src/app/shared/todos.service';
import { Todo } from 'src/models/todo.model';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.css']
})
export class FormDialogComponent implements OnInit {
  public form: FormGroup;
  public todoId: number;
  public todo: Todo;

  constructor(private fb: FormBuilder,
              private todosService: TodosService,
              private route: ActivatedRoute,
              private router: Router) {
                this.form = this.fb.group({
                  title: ['', Validators.compose([
                    Validators.minLength(3),
                    Validators.maxLength(90),
                    Validators.required
                  ])]
                });
               }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params.id) {
        this.todoId = params.id;
        this.todo = this.todosService.get(this.todoId);
        console.log(this.todo);
      }
    });
  }

  addTodo(): any{
    const title = this.form.controls.title.value;
    this.todosService.update(this.todoId, title);
    this.router.navigateByUrl('/');
    this.todosService.showMessage('Tarefa atualizada com sucesso');
  }

}
