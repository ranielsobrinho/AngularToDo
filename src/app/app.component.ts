import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faPlusCircle, faTimes, faCheckCircle, faWindowClose, faUndo } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public mode = 'list';
  public title = 'Lista de tarefas';
  public form: FormGroup;

  // *FontAwesome Icons
  faPlusCircle = faPlusCircle;
  faTimes = faTimes;
  faCheckCircle = faCheckCircle;
  faWindowClose = faWindowClose;
  faUndo = faUndo;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(45),
        Validators.required
      ])]
    });
  }


  changeMode(mode): any{
    this.mode = mode;
  }

}
