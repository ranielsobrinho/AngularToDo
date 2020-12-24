export class Todo {
  /**
   *Quando estanciar o todo no app.component aparecerá
   *quais são os requisitos da classe
   */
  constructor(
    public id: Number,
    public title: String,
    public done: Boolean,
  ) {  }
}
