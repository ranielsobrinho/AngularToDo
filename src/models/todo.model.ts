export class Todo {
// Quando estanciar o todo no app.component aparecerá
// quais são os requisitos da classe
  constructor(
    public id: number,
    public title: string,
    public done: boolean,
  ) {  }
}
