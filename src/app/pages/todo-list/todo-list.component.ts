import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodosService } from 'src/app/shared/todos.service';
import { Todo } from 'src/models/todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  public form: FormGroup;
  public todos: Todo[] = new Array<Todo>();
  public todo: Todo = {
    title: '',
    done: false
  };


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

  ngOnInit(): void {
    this.todosService.getAll().subscribe(dados => this.todos = dados);
  }

  addTodo(): any{
    this.todosService.add(this.todo).subscribe(() => {
      this.todosService.showMessage('Adicionado nova tarefa!');
    });
  }

  deleteTodo(id: number): void{
    const strID = String(id);
    let idTodo = this.todosService.getById(strID).subscribe( dados => idTodo = dados);
    console.log(idTodo);
    // this.todosService.remove(idTodo).subscribe(() => {
    //   this.todosService.showMessage('Removido!');
    // });
  }

  doneTodo(id: number): void{
    console.log('Hello world');
    // if (todo.done === true){
    //   this.todosService.undone(id);
    //   this.todosService.showMessage('Tarefa desfeita. Termine suas tarefas!');
    // }else{
    //   this.todosService.done(id);
    //   this.todosService.showMessage('Tarefa concluída. Parabéns!');
    // }
  }
}
